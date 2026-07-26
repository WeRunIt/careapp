import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { USE_MOCK_DATA } from "../config";
import { firebaseDb, firebaseMessaging, firestoreStatics } from "../firebase/native";
import { parseTimeString } from "../utils/date";

Notifications.setNotificationHandler({
  handleNotification:async()=>({shouldPlaySound:true,shouldSetBadge:false,shouldShowBanner:true,shouldShowList:true})
});
export async function configureNotificationChannels(){
  if(Platform.OS!=="android") return;
  await Notifications.setNotificationChannelAsync("medication-reminders",{
    name:"Medication reminders",importance:Notifications.AndroidImportance.HIGH,
    vibrationPattern:[0,250,150,250],lightColor:"#6B63B5"
  });
  await Notifications.setNotificationChannelAsync("care-alerts",{
    name:"Care alerts",importance:Notifications.AndroidImportance.MAX,
    vibrationPattern:[0,400,200,400],lightColor:"#A83F50"
  });
}
export async function requestNotificationsAndSaveToken(uid){
  if(USE_MOCK_DATA||!uid||!Device.isDevice) return null;
  let {status}=await Notifications.getPermissionsAsync();
  if(status!=="granted") ({status}=await Notifications.requestPermissionsAsync());
  if(status!=="granted") return null;
  await firebaseMessaging().registerDeviceForRemoteMessages();
  const token=await firebaseMessaging().getToken();
  await firebaseDb().collection("users").doc(uid).collection("devices").doc(token).set({
    token,platform:Platform.OS,enabled:true,updatedAt:firestoreStatics().FieldValue.serverTimestamp()
  },{merge:true});
  return token;
}
export async function scheduleDailyMedicationReminder(m){
  const t=parseTimeString(m.time); if(!t) return null;
  return Notifications.scheduleNotificationAsync({
    content:{title:`Time for ${m.name}`,body:`${m.dosage}. ${m.instructions||"Open WellNest to record the dose."}`,data:{type:"medication",medicationId:m.id||null},sound:true},
    trigger:{type:Notifications.SchedulableTriggerInputTypes.DAILY,hour:t.hour,minute:t.minute,channelId:"medication-reminders"}
  });
}


export async function requestNotificationPermission(){
  let {status}=await Notifications.getPermissionsAsync();
  if(status!=="granted") ({status}=await Notifications.requestPermissionsAsync());
  return status==="granted";
}

export async function configureNotificationCategories(){
  await configureNotificationChannels();
  await Notifications.setNotificationCategoryAsync("medication-actions",[
    {identifier:"TAKEN",buttonTitle:"Mark as taken",options:{opensAppToForeground:true}},
    {identifier:"SNOOZE",buttonTitle:"Snooze 15 min",options:{opensAppToForeground:false}}
  ]);
}
