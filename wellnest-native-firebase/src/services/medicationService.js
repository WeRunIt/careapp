import { firebaseDb, firestoreStatics } from "../firebase/native";
export const subscribeToMedications=(uid,callback,onError)=>firebaseDb()
  .collection("users").doc(uid).collection("medications").orderBy("time","asc")
  .onSnapshot(s=>callback(s.docs.map(d=>({id:d.id,...d.data()}))),onError);
export async function createMedication(uid,m){
  const F=firestoreStatics().FieldValue;
  const ref=await firebaseDb().collection("users").doc(uid).collection("medications").add({
    name:m.name.trim(),dosage:m.dosage.trim(),instructions:m.instructions?.trim()||"",
    time:m.time,remainingDoses:Number(m.remainingDoses||0),takenToday:false,enabled:true,
    createdAt:F.serverTimestamp(),updatedAt:F.serverTimestamp()
  });
  return ref.id;
}
export async function markMedicationTaken(uid,id){
  const db=firebaseDb(), ref=db.collection("users").doc(uid).collection("medications").doc(id);
  await db.runTransaction(async tx=>{
    const snap=await tx.get(ref); if(!snap.exists) throw new Error("Medication not found.");
    tx.update(ref,{
      takenToday:true,lastTakenAt:firestoreStatics().FieldValue.serverTimestamp(),
      remainingDoses:Math.max(0,Number(snap.data().remainingDoses||0)-1),
      updatedAt:firestoreStatics().FieldValue.serverTimestamp()
    });
  });
}
export const removeMedication=(uid,id)=>firebaseDb().collection("users").doc(uid).collection("medications").doc(id).delete();
