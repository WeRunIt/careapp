import { firebaseDb, firestoreStatics } from "../firebase/native";
export const subscribeToMoodLogs=(uid,callback,onError)=>firebaseDb()
  .collection("users").doc(uid).collection("moodLogs").orderBy("createdAt","desc").limit(30)
  .onSnapshot(s=>callback(s.docs.map(d=>({id:d.id,...d.data()}))),onError);
export const submitMoodLog=(uid,entry)=>firebaseDb().collection("users").doc(uid).collection("moodLogs").add({
  mood:Number(entry.mood),habits:entry.habits,notes:entry.notes?.trim()||"",
  createdAt:firestoreStatics().FieldValue.serverTimestamp()
});
