import { Redirect,Tabs } from "expo-router";
import { ActivityIndicator,StyleSheet,Text,View } from "react-native";
import { colors,typography } from "../../src/constants/theme";
import { useAuth } from "../../src/context/AuthContext";
const icons={home:"⌂",medications:"✚",mood:"☺","patient-profile":"●"};
export default function PatientTabs(){
  const {user,role,loading}=useAuth();
  if(loading) return <View style={styles.center}><ActivityIndicator color={colors.purple}/></View>;
  if(!user) return <Redirect href="/login"/>;
  if(role==="caregiver") return <Redirect href="/(caregiver)/dashboard"/>;
  return <Tabs screenOptions={({route})=>({
    headerShown:false,tabBarActiveTintColor:colors.purpleDark,tabBarInactiveTintColor:colors.textMuted,
    tabBarStyle:styles.tabBar,tabBarLabelStyle:styles.tabLabel,
    tabBarIcon:({color})=><Text style={[styles.icon,{color}]}>{icons[route.name]||"•"}</Text>
  })}>
    <Tabs.Screen name="home" options={{title:"Home"}}/>
    <Tabs.Screen name="medications" options={{title:"Meds"}}/>
    <Tabs.Screen name="mood" options={{title:"Mood"}}/>
    <Tabs.Screen name="patient-profile" options={{title:"Profile"}}/>
  </Tabs>;
}
const styles=StyleSheet.create({
  center:{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:colors.background},
  tabBar:{minHeight:70,paddingTop:8,paddingBottom:10,backgroundColor:colors.surface,borderTopColor:colors.border},
  tabLabel:{fontFamily:typography.bodyMedium,fontSize:12},icon:{fontFamily:typography.headingBold,fontSize:21}
});
