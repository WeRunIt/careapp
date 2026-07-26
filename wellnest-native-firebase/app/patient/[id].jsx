import { Alert,StyleSheet,View } from "react-native";
import { useLocalSearchParams,router } from "expo-router";
import { AppButton } from "../../src/components/AppButton";
import { Card } from "../../src/components/Card";
import { EmptyState } from "../../src/components/EmptyState";
import { Screen } from "../../src/components/Screen";
import { StatusChip } from "../../src/components/StatusChip";
import { Body,Caption,Heading } from "../../src/components/Typography";
import { colors,spacing } from "../../src/constants/theme";
import { useWellness } from "../../src/context/WellnessContext";
import { formatRelativeTime } from "../../src/utils/date";

export default function PatientDetailScreen(){
  const {id}=useLocalSearchParams();
  const {patients,alerts,acknowledgeAlert,unlink}=useWellness();
  const patient=patients.find(p=>String(p.id)===String(id));
  const patientAlerts=alerts.filter(a=>String(a.patientId)===String(id)&&a.status!=="acknowledged");

  if(!patient) return <Screen><EmptyState title="Patient not found" message="This relationship may have been removed or is not available to this account."
    actionTitle="Back to patients" onAction={()=>router.replace("/(caregiver)/patients")}/></Screen>;

  return <Screen>
    <Card style={patient.status==="attention"?styles.attention:styles.safe}>
      <View style={styles.top}><View style={styles.copy}><Heading>{patient.fullName}</Heading>
        <Caption>Last check-in: {formatRelativeTime(patient.lastCheckInAt)}</Caption></View>
        <StatusChip status={patient.status} label={patient.status==="attention"?"Needs attention":"Safe"}/></View>
      <Body style={styles.gap}>{patient.status==="attention"
        ?"The latest check-in is outside the patient’s configured safety window. Contact them using your normal trusted method."
        :"The patient’s latest check-in is within their configured safety window."}</Body>
    </Card>

    <View style={styles.metrics}>
      <Card style={styles.metric}><Caption>Latest mood</Caption><Heading>{patient.latestMood?`${patient.latestMood}/5`:"—"}</Heading></Card>
      <Card style={styles.metric}><Caption>Alert threshold</Caption><Heading>{patient.alertThresholdHours||6}h</Heading></Card>
    </View>

    <Card><Heading>Next medication</Heading>
      {patient.nextMedication?<><Body style={styles.medName}>{patient.nextMedication.name}</Body><Caption>Scheduled at {patient.nextMedication.time}</Caption></>
        :<Caption style={styles.gap}>No current medication is available.</Caption>}
    </Card>

    <Card><Heading>Active alerts</Heading>
      {patientAlerts.length?patientAlerts.map(a=><View key={a.id} style={styles.alertRow}><View style={styles.copy}>
        <Body>{a.message||"Missed check-in detected."}</Body><Caption>{formatRelativeTime(a.createdAt)}</Caption></View>
        <AppButton compact title="Acknowledge" onPress={()=>acknowledgeAlert(a.id)}/></View>)
        :<Caption style={styles.gap}>No active alerts for this patient.</Caption>}
    </Card>

    <AppButton title="Unlink patient" variant="danger" onPress={()=>Alert.alert("Unlink patient?","Your access to this patient’s data will end.",[
      {text:"Cancel",style:"cancel"},
      {text:"Unlink",style:"destructive",onPress:async()=>{await unlink(patient.linkId);router.replace("/(caregiver)/patients");}}
    ])}/>
  </Screen>;
}
const styles=StyleSheet.create({
  safe:{backgroundColor:colors.sageSoft,borderColor:colors.sageSoft},attention:{backgroundColor:colors.dangerSoft,borderColor:colors.danger},
  top:{flexDirection:"row",alignItems:"flex-start",gap:spacing.md},copy:{flex:1},gap:{marginTop:spacing.md},
  metrics:{flexDirection:"row",gap:spacing.md},metric:{flex:1,padding:spacing.md},medName:{marginTop:spacing.md,fontSize:18},
  alertRow:{flexDirection:"row",alignItems:"center",gap:spacing.md,paddingVertical:spacing.md,borderBottomWidth:1,borderBottomColor:colors.border}
});
