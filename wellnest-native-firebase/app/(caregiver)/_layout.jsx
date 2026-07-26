import { Redirect,Tabs } from "expo-router";
import { ActivityIndicator,StyleSheet,Text,View } from "react-native";
import { colors,typography } from "../../src/constants/theme";
import { useAuth } from "../../src/context/AuthContext";

const icons={dashboard:"⌂",patients:"♙","caregiver-profile":"●"};

export default function CaregiverTabs(){
  const {user,role,loading}=useAuth();
  if(loading) return <View style={styles.center}><ActivityIndicator color={colors.purple}/></View>;
  if(!user) return <Redirect href="/login"/>;
  if(role==="patient") return <Redirect href="/(patient)/home"/>;
  return <Tabs screenOptions={({route})=>({
    headerShown:false,
    tabBarActiveTintColor:colors.purpleDark,
    tabBarInactiveTintColor:colors.textMuted,
    tabBarStyle:styles.tabBar,
    tabBarLabelStyle:styles.tabLabel,
    tabBarIcon:({color})=><Text style={[styles.icon,{color}]}>{icons[route.name]||"•"}</Text>
  })}>
    <Tabs.Screen name="dashboard" options={{title:"Dashboard"}}/>
    <Tabs.Screen name="patients" options={{title:"Patients"}}/>
    <Tabs.Screen name="caregiver-profile" options={{title:"Profile"}}/>
  </Tabs>;
}
const styles=StyleSheet.create({
  center:{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:colors.background},
  tabBar:{minHeight:70,paddingTop:8,paddingBottom:10,backgroundColor:colors.surface,borderTopColor:colors.border},
  tabLabel:{fontFamily:typography.bodyMedium,fontSize:12},
  icon:{fontFamily:typography.headingBold,fontSize:21}
});
