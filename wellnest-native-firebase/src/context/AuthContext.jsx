import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { USE_MOCK_DATA } from "../config";
import { mockCaregiverUser, mockPatientUser } from "../data/mockData";
import {
  createAccount, getProfile, sendPasswordReset, signInWithEmail,
  signOutCurrentUser, subscribeToAuth, subscribeToProfile
} from "../services/authService";
import { deleteMyAccount as deleteMyAccountRemote } from "../services/caregiverService";

const AuthContext=createContext(null);
const MOCK_KEY="wellnest.mock.user";

export function AuthProvider({children}){
  const [user,setUser]=useState(null);
  const [profile,setProfile]=useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    if(USE_MOCK_DATA){
      AsyncStorage.getItem(MOCK_KEY).then(stored=>{
        if(stored){const parsed=JSON.parse(stored);setUser(parsed);setProfile(parsed);}
      }).finally(()=>setLoading(false));
      return;
    }
    let unsubscribeProfile;
    const unsubscribeAuth=subscribeToAuth(async firebaseUser=>{
      unsubscribeProfile?.(); unsubscribeProfile=null;
      if(!firebaseUser){setUser(null);setProfile(null);setLoading(false);return;}
      setUser(firebaseUser);
      setProfile(await getProfile(firebaseUser.uid));
      unsubscribeProfile=subscribeToProfile(firebaseUser.uid,next=>{
        setProfile(next);setLoading(false);
      });
    });
    return()=>{unsubscribeAuth?.();unsubscribeProfile?.();};
  },[]);

  const login=useCallback(async({email,password,demoRole})=>{
    setLoading(true);
    try{
      if(USE_MOCK_DATA){
        const next=demoRole==="caregiver"||email.toLowerCase().includes("caregiver")
          ?mockCaregiverUser:mockPatientUser;
        await AsyncStorage.setItem(MOCK_KEY,JSON.stringify(next));
        setUser(next);setProfile(next);return next;
      }
      return await signInWithEmail(email,password);
    }finally{setLoading(false);}
  },[]);

  const register=useCallback(async values=>{
    setLoading(true);
    try{
      if(USE_MOCK_DATA){
        const base=values.role==="caregiver"?mockCaregiverUser:mockPatientUser;
        const next={...base,email:values.email.trim().toLowerCase(),fullName:values.fullName.trim(),role:values.role,relation:values.relation||null};
        await AsyncStorage.setItem(MOCK_KEY,JSON.stringify(next));
        setUser(next);setProfile(next);return next;
      }
      return await createAccount(values);
    }finally{setLoading(false);}
  },[]);

  const logout=useCallback(async()=>{
    if(USE_MOCK_DATA){
      await AsyncStorage.removeItem(MOCK_KEY);setUser(null);setProfile(null);return;
    }
    await signOutCurrentUser();
  },[]);

  const resetPassword=useCallback(async email=>{
    if(!USE_MOCK_DATA) await sendPasswordReset(email);
  },[]);

  const deleteAccount=useCallback(async()=>{
    if(USE_MOCK_DATA){await logout();return;}
    await deleteMyAccountRemote();setUser(null);setProfile(null);
  },[logout]);

  const value=useMemo(()=>({
    user,profile,role:profile?.role||null,loading,login,register,logout,
    resetPassword,deleteAccount,isMockMode:USE_MOCK_DATA
  }),[user,profile,loading,login,register,logout,resetPassword,deleteAccount]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth(){
  const value=useContext(AuthContext);
  if(!value) throw new Error("useAuth must be used inside AuthProvider.");
  return value;
}
