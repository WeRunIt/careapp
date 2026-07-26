import { firebaseAuth, firebaseDb, firestoreStatics } from "../firebase/native";

export const subscribeToAuth=(callback)=>firebaseAuth().onAuthStateChanged(callback);
export async function getProfile(uid){
  const snap=await firebaseDb().collection("users").doc(uid).get();
  return snap.exists?{uid:snap.id,...snap.data()}:null;
}
export const subscribeToProfile=(uid,callback)=>firebaseDb().collection("users").doc(uid).onSnapshot(
  snap=>callback(snap.exists?{uid:snap.id,...snap.data()}:null)
);
export async function signInWithEmail(email,password){
  return (await firebaseAuth().signInWithEmailAndPassword(email.trim(),password)).user;
}
export async function createAccount({email,password,fullName,role,relation}){
  const credential=await firebaseAuth().createUserWithEmailAndPassword(email.trim(),password);
  const F=firestoreStatics().FieldValue;
  await firebaseDb().collection("users").doc(credential.user.uid).set({
    email:email.trim().toLowerCase(),fullName:fullName.trim(),role,
    relation:relation?.trim()||null,alertThresholdHours:6,emergencyContact:null,
    lastCheckInAt:null,activeMissedCheckInAlertId:null,
    createdAt:F.serverTimestamp(),updatedAt:F.serverTimestamp()
  });
  return credential.user;
}
export const signOutCurrentUser=()=>firebaseAuth().signOut();
export const sendPasswordReset=(email)=>firebaseAuth().sendPasswordResetEmail(email.trim());
