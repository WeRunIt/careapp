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

export default function CaregiverProfileScreen(){
  const {profile,logout,isMockMode}=useAuth();
  const {patients,unlink}=useWellness();
  async function signOut(){await logout();router.replace("/login");}

  return <Screen>
    <AppHeader title="Profile" subtitle={isMockMode?"Mock data mode":"Firebase connected"}/>
    <Card>
      <View style={styles.avatar}><Heading style={styles.avatarText}>{profile?.fullName?.charAt(0)?.toUpperCase()||"W"}</Heading></View>
      <Heading>{profile?.fullName||"Caregiver"}</Heading><Caption>{profile?.email}</Caption>
      <Body style={styles.role}>Caregiver account</Body>
    </Card>
    <Card><Heading>Linked patients</Heading><Caption style={styles.note}>Your access ends immediately when a relationship is removed.</Caption>
      {patients.length?patients.map(p=><View key={p.linkId||p.id} style={styles.personRow}>
        <View style={styles.personCopy}><Body>{p.fullName||"Patient"}</Body><Caption>{p.status==="attention"?"Needs attention":"Within safety window"}</Caption></View>
        <AppButton compact title="Remove" variant="danger" onPress={()=>Alert.alert("Unlink patient?","You will no longer be able to view this patient’s wellness data.",[
          {text:"Cancel",style:"cancel"},
          {text:"Unlink",style:"destructive",onPress:()=>unlink(p.linkId)}
        ])}/>
      </View>):<Caption>No patients linked yet.</Caption>}
      <AppButton title="Link another patient" variant="secondary" onPress={()=>router.push("/pairing")} style={styles.top}/>
    </Card>
    <Card><Heading>Account</Heading><View style={styles.stack}>
      <AppButton title="Notification settings" variant="outline" onPress={()=>router.push("/settings")}/>
      <AppButton title="Delete account and data" variant="danger" onPress={()=>router.push("/account/delete")}/>
      <AppButton title="Sign out" variant="outline" onPress={signOut}/>
    </View></Card>
    <Caption style={styles.footer}>WellNest 1.0.0 · Wellness support, not an emergency service.</Caption>
  </Screen>;
}
const styles=StyleSheet.create({
  avatar:{width:64,height:64,borderRadius:24,alignItems:"center",justifyContent:"center",backgroundColor:colors.sageSoft,marginBottom:spacing.md},
  avatarText:{color:colors.sageDark},role:{color:colors.purpleDark,marginTop:spacing.sm},note:{marginTop:spacing.xs,marginBottom:spacing.md},
  personRow:{flexDirection:"row",alignItems:"center",gap:spacing.md,paddingVertical:spacing.sm,borderBottomWidth:1,borderBottomColor:colors.border},
  personCopy:{flex:1},top:{marginTop:spacing.md},stack:{gap:spacing.sm,marginTop:spacing.md},footer:{textAlign:"center"}
});
