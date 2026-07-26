import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { USE_MOCK_DATA } from "../config";
import {
  initialAlerts,initialCaregivers,initialCheckIns,initialMedications,initialMoodLogs,initialPatients
} from "../data/mockData";
import {
  acknowledgeAlert as acknowledgeAlertRemote,generatePairingCode as generatePairingCodeRemote,
  loadCaregiverDashboard,redeemPairingCode as redeemPairingCodeRemote,
  subscribeToPatientCaregivers,unlinkRelationship
} from "../services/caregiverService";
import { submitCheckIn as submitCheckInRemote,subscribeToCheckIns } from "../services/checkInService";
import {
  createMedication,markMedicationTaken as markMedicationTakenRemote,
  removeMedication as removeMedicationRemote,subscribeToMedications
} from "../services/medicationService";
import { submitMoodLog as submitMoodLogRemote,subscribeToMoodLogs } from "../services/moodService";
import { scheduleDailyMedicationReminder } from "../services/notificationService";
import { useAuth } from "./AuthContext";

const WellnessContext=createContext(null);
const MOCK_KEY="wellnest.mock.data";
const defaults={medications:initialMedications,moodLogs:initialMoodLogs,checkIns:initialCheckIns,caregivers:initialCaregivers,patients:initialPatients,alerts:initialAlerts};

export function WellnessProvider({children}){
  const {user,role}=useAuth();
  const [medications,setMedications]=useState([]);
  const [moodLogs,setMoodLogs]=useState([]);
  const [checkIns,setCheckIns]=useState([]);
  const [caregivers,setCaregivers]=useState([]);
  const [patients,setPatients]=useState([]);
  const [alerts,setAlerts]=useState([]);
  const [pairingCode,setPairingCode]=useState(null);
  const [loading,setLoading]=useState(false);

  const persistMock=useCallback(async patch=>{
    const next={medications,moodLogs,checkIns,caregivers,patients,alerts,...patch};
    await AsyncStorage.setItem(MOCK_KEY,JSON.stringify(next));
  },[medications,moodLogs,checkIns,caregivers,patients,alerts]);

  useEffect(()=>{
    if(!user){
      setMedications([]);setMoodLogs([]);setCheckIns([]);setCaregivers([]);setPatients([]);setAlerts([]);setPairingCode(null);
      return;
    }
    if(USE_MOCK_DATA){
      setLoading(true);
      AsyncStorage.getItem(MOCK_KEY).then(stored=>{
        const data=stored?JSON.parse(stored):defaults;
        setMedications(data.medications||[]);setMoodLogs(data.moodLogs||[]);
        setCheckIns(data.checkIns||[]);setCaregivers(data.caregivers||[]);
        setPatients(data.patients||[]);setAlerts(data.alerts||[]);
      }).finally(()=>setLoading(false));
      return;
    }

    setLoading(true);const unsubs=[];
    if(role==="patient"){
      unsubs.push(
        subscribeToMedications(user.uid,setMedications,console.error),
        subscribeToMoodLogs(user.uid,setMoodLogs,console.error),
        subscribeToCheckIns(user.uid,setCheckIns,console.error),
        subscribeToPatientCaregivers(user.uid,setCaregivers,console.error)
      );setLoading(false);
    }else if(role==="caregiver"){
      loadCaregiverDashboard(user.uid).then(r=>{setPatients(r.patients);setAlerts(r.alerts);}).finally(()=>setLoading(false));
    }
    return()=>unsubs.forEach(fn=>fn?.());
  },[user,role]);

  const addMedication=useCallback(async values=>{
    if(!user) throw new Error("Sign in first.");
    if(USE_MOCK_DATA){
      const item={id:`med-${Date.now()}`,...values,remainingDoses:Number(values.remainingDoses||0),takenToday:false,enabled:true};
      const next=[...medications,item].sort((a,b)=>String(a.time).localeCompare(String(b.time)));
      setMedications(next);await persistMock({medications:next});
      await scheduleDailyMedicationReminder(item).catch(()=>null);return item.id;
    }
    const id=await createMedication(user.uid,values);
    await scheduleDailyMedicationReminder({id,...values}).catch(()=>null);return id;
  },[user,medications,persistMock]);

  const markMedicationTaken=useCallback(async id=>{
    if(!user) return;
    if(USE_MOCK_DATA){
      const next=medications.map(m=>m.id===id?{...m,takenToday:true,remainingDoses:Math.max(0,Number(m.remainingDoses||0)-1),lastTakenAt:new Date().toISOString()}:m);
      setMedications(next);await persistMock({medications:next});
    }else await markMedicationTakenRemote(user.uid,id);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(()=>null);
  },[user,medications,persistMock]);

  const removeMedication=useCallback(async id=>{
    if(!user) return;
    if(USE_MOCK_DATA){
      const next=medications.filter(m=>m.id!==id);setMedications(next);await persistMock({medications:next});
    }else await removeMedicationRemote(user.uid,id);
  },[user,medications,persistMock]);

  const submitMoodLog=useCallback(async entry=>{
    if(!user) return;
    if(USE_MOCK_DATA){
      const next=[{id:`mood-${Date.now()}`,...entry,createdAt:new Date().toISOString()},...moodLogs];
      setMoodLogs(next);await persistMock({moodLogs:next});
    }else await submitMoodLogRemote(user.uid,entry);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(()=>null);
  },[user,moodLogs,persistMock]);

  const submitCheckIn=useCallback(async()=>{
    if(!user) return;
    if(USE_MOCK_DATA){
      const next=[{id:`check-${Date.now()}`,status:"okay",createdAt:new Date().toISOString()},...checkIns];
      setCheckIns(next);await persistMock({checkIns:next});
    }else await submitCheckInRemote(user.uid);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(()=>null);
  },[user,checkIns,persistMock]);

  const generatePairingCode=useCallback(async()=>{
    const result=USE_MOCK_DATA?{code:"481926",expiresAt:new Date(Date.now()+600000).toISOString()}:await generatePairingCodeRemote();
    setPairingCode(result);return result;
  },[]);
  const redeemPairingCode=useCallback(async code=>USE_MOCK_DATA?{patientId:"demo-patient",linkId:"mock-link"}:redeemPairingCodeRemote(code),[]);
  const acknowledgeAlert=useCallback(async id=>{
    if(USE_MOCK_DATA){
      const next=alerts.map(a=>a.id===id?{...a,status:"acknowledged",acknowledgedAt:new Date().toISOString()}:a);
      setAlerts(next);await persistMock({alerts:next});
    }else{await acknowledgeAlertRemote(id);setAlerts(v=>v.filter(a=>a.id!==id));}
  },[alerts,persistMock]);
  const unlink=useCallback(async linkId=>{
    if(USE_MOCK_DATA){
      const c=caregivers.filter(x=>x.id!==linkId),p=patients.filter(x=>x.linkId!==linkId);
      setCaregivers(c);setPatients(p);await persistMock({caregivers:c,patients:p});
    }else await unlinkRelationship(linkId);
  },[caregivers,patients,persistMock]);
  const refreshCaregiver=useCallback(async()=>{
    if(!user||role!=="caregiver"||USE_MOCK_DATA) return;
    const r=await loadCaregiverDashboard(user.uid);setPatients(r.patients);setAlerts(r.alerts);
  },[user,role]);

  const value=useMemo(()=>({
    medications,moodLogs,checkIns,caregivers,patients,alerts,pairingCode,loading,
    addMedication,markMedicationTaken,removeMedication,submitMoodLog,submitCheckIn,
    generatePairingCode,redeemPairingCode,acknowledgeAlert,unlink,refreshCaregiver
  }),[medications,moodLogs,checkIns,caregivers,patients,alerts,pairingCode,loading,
    addMedication,markMedicationTaken,removeMedication,submitMoodLog,submitCheckIn,
    generatePairingCode,redeemPairingCode,acknowledgeAlert,unlink,refreshCaregiver]);

  return <WellnessContext.Provider value={value}>{children}</WellnessContext.Provider>;
}
export function useWellness(){
  const value=useContext(WellnessContext);
  if(!value) throw new Error("useWellness must be used inside WellnessProvider.");
  return value;
}
