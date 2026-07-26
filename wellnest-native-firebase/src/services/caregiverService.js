import { firebaseDb, firebaseFunctions, firestoreStatics } from "../firebase/native";
export async function callFunction(name,payload){
  return (await firebaseFunctions().httpsCallable(name)(payload)).data;
}
export const generatePairingCode=()=>callFunction("generatePairingCode",{});
export const redeemPairingCode=(code)=>callFunction("redeemPairingCode",{code:String(code).trim()});
export const unlinkRelationship=(linkId)=>callFunction("unlinkRelationship",{linkId});
export const deleteMyAccount=()=>callFunction("deleteMyAccount",{});
export const acknowledgeAlert=(id)=>firebaseDb().collection("alerts").doc(id).update({
  status:"acknowledged",acknowledgedAt:firestoreStatics().FieldValue.serverTimestamp()
});
export const subscribeToPatientCaregivers=(patientId,callback,onError)=>firebaseDb().collection("caregiverLinks")
  .where("patientId","==",patientId).where("status","==","active")
  .onSnapshot(async snap=>{
    try{
      const rows=await Promise.all(snap.docs.map(async d=>{
        const link=d.data(),u=await firebaseDb().collection("users").doc(link.caregiverId).get();
        return {id:d.id,...link,...(u.exists?u.data():{})};
      }));
      callback(rows);
    }catch(e){onError?.(e);}
  },onError);

export async function loadCaregiverDashboard(caregiverId){
  const db=firebaseDb();
  const links=await db.collection("caregiverLinks").where("caregiverId","==",caregiverId).where("status","==","active").get();
  const patients=await Promise.all(links.docs.map(async linkDoc=>{
    const link=linkDoc.data();
    const [p,m,med]=await Promise.all([
      db.collection("users").doc(link.patientId).get(),
      db.collection("users").doc(link.patientId).collection("moodLogs").orderBy("createdAt","desc").limit(1).get(),
      db.collection("users").doc(link.patientId).collection("medications").orderBy("time","asc").limit(1).get()
    ]);
    const data=p.exists?p.data():{}, mood=m.empty?null:m.docs[0].data(), medication=med.empty?null:med.docs[0].data();
    const last=data.lastCheckInAt?.toDate?.(),threshold=Number(data.alertThresholdHours||6);
    return {
      id:link.patientId,linkId:linkDoc.id,...data,latestMood:mood?.mood||null,
      nextMedication:medication?{name:medication.name,time:medication.time}:null,
      status:!last||Date.now()-last.getTime()>threshold*3600000?"attention":"safe"
    };
  }));
  const a=await db.collection("alerts").where("caregiverIds","array-contains",caregiverId)
    .where("status","==","active").orderBy("createdAt","desc").limit(30).get();
  return {patients,alerts:a.docs.map(d=>({id:d.id,...d.data()}))};
}
