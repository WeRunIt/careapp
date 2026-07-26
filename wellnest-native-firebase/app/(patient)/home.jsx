import { Alert,StyleSheet,View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "../../src/components/AppButton";
import { AppHeader } from "../../src/components/AppHeader";
import { Card } from "../../src/components/Card";
import { MedicationCard } from "../../src/components/MedicationCard";
import { Screen } from "../../src/components/Screen";
import { StatusChip } from "../../src/components/StatusChip";
import { Body,Caption,Heading } from "../../src/components/Typography";
import { colors,spacing,typography } from "../../src/constants/theme";
import { useAuth } from "../../src/context/AuthContext";
import { useWellness } from "../../src/context/WellnessContext";
import { formatRelativeTime } from "../../src/utils/date";

export default function PatientHomeScreen(){
  const {profile}=useAuth();
  const {medications,checkIns,moodLogs,caregivers,submitCheckIn,markMedicationTaken}=useWellness();
  const firstName=profile?.fullName?.split(" ")[0]||"there";
  const lastCheckIn=checkIns[0]?.createdAt||profile?.lastCheckInAt;
  const nextMedication=medications.find(x=>!x.takenToday)||medications[0];
  const latestMood=moodLogs[0]?.mood;
  async function checkIn(){
    try{await submitCheckIn();Alert.alert("Check-in recorded","Your linked caregivers can now see that you are okay.");}
    catch(e){Alert.alert("Could not check in",e.message);}
  }
  return <Screen>
    <AppHeader title={`Good day, ${firstName}`} subtitle="Here is your wellness overview."/>
    <Card style={styles.checkInCard}>
      <View style={styles.statusRow}><View style={styles.statusCopy}>
        <Caption style={styles.lightCaption}>Daily safety check-in</Caption>
        <Heading style={styles.lightHeading}>Let your care circle know you are okay</Heading>
      </View><StatusChip status={lastCheckIn?"safe":"attention"} label={lastCheckIn?formatRelativeTime(lastCheckIn):"Not checked"}/></View>
      <AppButton title="I’m OK" variant="sage" onPress={checkIn} style={styles.checkInButton}
        accessibilityHint="Records a safety check-in for linked caregivers"/>
    </Card>

    <View style={styles.twoColumn}>
      <Card style={styles.metricCard}><Caption>Latest mood</Caption><Heading style={styles.metricValue}>{latestMood?`${latestMood}/5`:"Not logged"}</Heading>
        <AppButton compact title="Log mood" variant="secondary" onPress={()=>router.push("/(patient)/mood")}/></Card>
      <Card style={styles.metricCard}><Caption>Care circle</Caption><Heading style={styles.metricValue}>{caregivers.length}</Heading>
        <AppButton compact title="Pair caregiver" variant="outline" onPress={()=>router.push("/pairing")}/></Card>
    </View>

    <View style={styles.sectionHeader}><Heading>Next medication</Heading><Caption>{medications.length} active</Caption></View>
    {nextMedication?<MedicationCard medication={nextMedication} onTake={markMedicationTaken}/>:<Card>
      <Heading>No medications yet</Heading><Body style={styles.muted}>Add your first medication and schedule a daily reminder.</Body>
      <AppButton title="Add medication" onPress={()=>router.push("/medication/add")}/>
    </Card>}
    <Card style={styles.insightCard}><Caption style={styles.insightLabel}>Gentle insight</Caption><Body>
      {moodLogs.length>1?"Your recent logs suggest your mood is often better on days when you eat breakfast.":"Log a few days of mood and habits to reveal simple personal patterns."}
    </Body></Card>
  </Screen>;
}
const styles=StyleSheet.create({
  checkInCard:{backgroundColor:colors.purple,borderColor:colors.purple},statusRow:{flexDirection:"row",alignItems:"flex-start",gap:spacing.md},
  statusCopy:{flex:1},lightCaption:{color:"#EDEAFB"},lightHeading:{color:colors.white,marginTop:spacing.xs},
  checkInButton:{marginTop:spacing.lg,backgroundColor:colors.white,borderColor:colors.white},
  twoColumn:{flexDirection:"row",gap:spacing.md},metricCard:{flex:1,padding:spacing.md},
  metricValue:{color:colors.purpleDark,fontFamily:typography.headingBold,fontSize:26,marginVertical:spacing.sm},
  sectionHeader:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:spacing.sm,marginBottom:spacing.md},
  muted:{color:colors.textMuted,marginVertical:spacing.md},insightCard:{backgroundColor:colors.sageSoft,borderColor:colors.sageSoft},
  insightLabel:{color:colors.sageDark,fontFamily:typography.bodyBold,marginBottom:spacing.sm}
});
