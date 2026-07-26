import "react-native-reanimated";
import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Inter_400Regular,Inter_500Medium,Inter_700Bold,useFonts as useInterFonts } from "@expo-google-fonts/inter";
import { Poppins_600SemiBold,Poppins_700Bold,useFonts as usePoppinsFonts } from "@expo-google-fonts/poppins";
import { AuthProvider } from "../src/context/AuthContext";
import { WellnessProvider } from "../src/context/WellnessContext";
import { NotificationBootstrap } from "../src/components/NotificationBootstrap";
import { colors } from "../src/constants/theme";

SplashScreen.preventAutoHideAsync().catch(()=>null);

export default function RootLayout(){
  const [interLoaded]=useInterFonts({Inter_400Regular,Inter_500Medium,Inter_700Bold});
  const [poppinsLoaded]=usePoppinsFonts({Poppins_600SemiBold,Poppins_700Bold});
  const loaded=interLoaded&&poppinsLoaded;
  useEffect(()=>{if(loaded) SplashScreen.hideAsync().catch(()=>null);},[loaded]);
  if(!loaded) return null;
  return <AuthProvider><WellnessProvider><NotificationBootstrap/>
    <StatusBar style="dark" backgroundColor={colors.background}/>
    <Stack screenOptions={{headerStyle:{backgroundColor:colors.background},headerShadowVisible:false,headerTintColor:colors.text,contentStyle:{backgroundColor:colors.background}}}>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="(auth)" options={{headerShown:false}}/>
      <Stack.Screen name="(patient)" options={{headerShown:false}}/>
      <Stack.Screen name="(caregiver)" options={{headerShown:false}}/>
      <Stack.Screen name="medication/add" options={{title:"Add medication",presentation:"modal"}}/>
      <Stack.Screen name="pairing" options={{title:"Caregiver pairing"}}/>
      <Stack.Screen name="patient/[id]" options={{title:"Patient details"}}/>
      <Stack.Screen name="settings" options={{title:"Settings"}}/>
      <Stack.Screen name="account/delete" options={{title:"Delete account"}}/>
    </Stack>
  </WellnessProvider></AuthProvider>;
}
