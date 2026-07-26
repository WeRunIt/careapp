import { Alert,StyleSheet,View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "../../src/components/AppButton";
import { AppHeader } from "../../src/components/AppHeader";
import { Card } from "../../src/components/Card";
import { Screen } from "../../src/components/Screen";
import { Body,Caption,Heading } from "../../src/components/Typography";
import { colors,spacing } from "../../src/constants/theme";
import { useAuth } from "../../src/context/AuthContext";
import { useWellness } from "../../src/context/WellnessContext";

export default function PatientProfileScreen(){
  const {profile,logout,isMockMode}=useAuth();
  const {caregivers,unlink}=useWellness();
  async function signOut(){await logout();router.replace("/login");}
  return <Screen>
    <AppHeader title="Profile" subtitle={isMockMode?"Mock data mode":"Firebase connected"}/>
    <Card><View style={styles.avatar}><Heading style={styles.avatarText}>{profile?.fullName?.charAt(0)?.toUpperCase()||"W"}</Heading></View>
      <Heading>{profile?.fullName||"Patient"}</Heading><Caption>{profile?.email}</Caption><Body style={styles.role}>Patient account</Body></Card>
    <Card><Heading>Care circle</Heading><Caption style={styles.note}>Linked caregivers can view wellness status allowed by your account.</Caption>
      {caregivers.length?caregivers.map(c=><View key={c.id} style={styles.personRow}><View style={styles.personCopy}>
        <Body>{c.fullName||"Caregiver"}</Body><Caption>{c.relation||"Linked caregiver"}</Caption></View>
        <AppButton compact title="Remove" variant="danger" onPress={()=>Alert.alert("Remove caregiver?","They will immediately lose access to your wellness data.",[
          {text:"Cancel",style:"cancel"},{text:"Remove",style:"destructive",onPress:()=>unlink(c.id)}
        ])}/></View>):<Caption>No caregivers are linked yet.</Caption>}
      <AppButton title="Generate pairing code" variant="secondary" onPress={()=>router.push("/pairing")} style={styles.top}/>
    </Card>
    <Card><Heading>Account & preferences</Heading><View style={styles.stack}>
      <AppButton title="Notification and safety settings" variant="outline" onPress={()=>router.push("/settings")}/>
      <AppButton title="Delete account and data" variant="danger" onPress={()=>router.push("/account/delete")}/>
      <AppButton title="Sign out" variant="outline" onPress={signOut}/>
    </View></Card>
    <Caption style={styles.footer}>WellNest 1.0.0 · Wellness support, not an emergency service.</Caption>
  </Screen>;
}
const styles=StyleSheet.create({
  avatar:{width:64,height:64,borderRadius:24,alignItems:"center",justifyContent:"center",backgroundColor:colors.purpleSoft,marginBottom:spacing.md},
  avatarText:{color:colors.purpleDark},role:{color:colors.sageDark,marginTop:spacing.sm},note:{marginTop:spacing.xs,marginBottom:spacing.md},
  personRow:{flexDirection:"row",alignItems:"center",gap:spacing.md,paddingVertical:spacing.sm,borderBottomWidth:1,borderBottomColor:colors.border},
  personCopy:{flex:1},top:{marginTop:spacing.md},stack:{gap:spacing.sm,marginTop:spacing.md},footer:{textAlign:"center"}
});
