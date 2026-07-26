import { firebaseDb, firestoreStatics } from "../firebase/native";
export const subscribeToCheckIns=(uid,callback,onError)=>firebaseDb()
  .collection("users").doc(uid).collection("checkIns").orderBy("createdAt","desc").limit(30)
  .onSnapshot(s=>callback(s.docs.map(d=>({id:d.id,...d.data()}))),onError);
export async function submitCheckIn(uid){
  const db=firebaseDb(),F=firestoreStatics().FieldValue;
  const check=db.collection("users").doc(uid).collection("checkIns").doc();
  const batch=db.batch();
  batch.set(check,{status:"okay",createdAt:F.serverTimestamp(),timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,source:"mobile"});
  batch.set(db.collection("users").doc(uid),{lastCheckInAt:F.serverTimestamp(),activeMissedCheckInAlertId:null,updatedAt:F.serverTimestamp()},{merge:true});
  await batch.commit(); return check.id;
}
