import { useEffect,useState } from "react";
import { Alert,StyleSheet,Switch,View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppButton } from "../src/components/AppButton";
import { Card } from "../src/components/Card";
import { Screen } from "../src/components/Screen";
import { Body,Caption,Heading } from "../src/components/Typography";
import { colors,spacing } from "../src/constants/theme";
import { useAuth } from "../src/context/AuthContext";
import { configureNotificationCategories,requestNotificationPermission } from "../src/services/notificationService";

const KEY="wellnest.preferences";

export default function SettingsScreen(){
  const {role}=useAuth();
  const [prefs,setPrefs]=useState({notifications:true,careAlerts:true,gentleHaptics:true});
  const [busy,setBusy]=useState(false);

  useEffect(()=>{AsyncStorage.getItem(KEY).then(v=>{if(v)setPrefs(JSON.parse(v));}).catch(()=>null);},[]);
  async function update(name,value){
    const next={...prefs,[name]:value};setPrefs(next);await AsyncStorage.setItem(KEY,JSON.stringify(next));
  }
  async function enableNotifications(){
    setBusy(true);
    try{
      const allowed=await requestNotificationPermission();
      if(allowed){await configureNotificationCategories();await update("notifications",true);Alert.alert("Notifications enabled","Reminder permissions are ready on this device.");}
      else Alert.alert("Permission not granted","You can enable notifications later in Android settings.");
    }finally{setBusy(false);}
  }

  return <Screen>
    <Card><Heading>Notifications</Heading><SettingRow title="Medication reminders" description="Daily local reminders for scheduled medication times."
      value={prefs.notifications} onValueChange={value=>value?enableNotifications():update("notifications",false)}/>
      {role==="caregiver"?<SettingRow title="Caregiver safety alerts" description="Push notifications for missed check-ins from linked patients."
        value={prefs.careAlerts} onValueChange={value=>update("careAlerts",value)}/>:null}
      <AppButton title="Request notification permission" variant="secondary" onPress={enableNotifications} loading={busy} style={styles.top}/>
    </Card>
    <Card><Heading>Experience</Heading><SettingRow title="Gentle haptics" description="Small vibration feedback after check-ins and completed actions."
      value={prefs.gentleHaptics} onValueChange={value=>update("gentleHaptics",value)}/></Card>
    <Card style={styles.warning}><Heading>Important</Heading><Body style={styles.top}>WellNest is a wellness-support application. It does not monitor emergencies continuously and is not a replacement for local emergency services.</Body></Card>
  </Screen>;
}
function SettingRow({title,description,value,onValueChange}){
  return <View style={styles.row}><View style={styles.copy}><Body style={styles.title}>{title}</Body><Caption>{description}</Caption></View>
    <Switch value={value} onValueChange={onValueChange} trackColor={{false:colors.border,true:colors.sage}} thumbColor={colors.white}/></View>;
}
const styles=StyleSheet.create({
  row:{flexDirection:"row",alignItems:"center",gap:spacing.md,paddingVertical:spacing.md,borderBottomWidth:1,borderBottomColor:colors.border},
  copy:{flex:1},title:{color:colors.text},top:{marginTop:spacing.md},
  warning:{backgroundColor:colors.warningSoft,borderColor:colors.warningSoft}
});
