import { ActivityIndicator,StyleSheet,View } from "react-native";
import { Redirect } from "expo-router";
import { colors } from "../src/constants/theme";
import { useAuth } from "../src/context/AuthContext";
export default function IndexScreen(){
  const {user,role,loading}=useAuth();
  if(loading) return <View style={styles.center}><ActivityIndicator size="large" color={colors.purple}/></View>;
  if(!user) return <Redirect href="/login"/>;
  return role==="caregiver"?<Redirect href="/(caregiver)/dashboard"/>:<Redirect href="/(patient)/home"/>;
}
const styles=StyleSheet.create({center:{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:colors.background}});
