import { Alert,RefreshControl,StyleSheet,View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "../../src/components/AppButton";
import { AppHeader } from "../../src/components/AppHeader";
import { Card } from "../../src/components/Card";
import { EmptyState } from "../../src/components/EmptyState";
import { PatientCard } from "../../src/components/PatientCard";
import { Screen } from "../../src/components/Screen";
import { StatusChip } from "../../src/components/StatusChip";
import { Body,Caption,Heading } from "../../src/components/Typography";
import { colors,spacing } from "../../src/constants/theme";
import { useAuth } from "../../src/context/AuthContext";
import { useWellness } from "../../src/context/WellnessContext";
import { formatRelativeTime } from "../../src/utils/date";

export default function CaregiverDashboard(){
  const {profile}=useAuth();
  const {patients,alerts,loading,acknowledgeAlert,refreshCaregiver}=useWellness();
  const firstName=profile?.fullName?.split(" ")[0]||"there";
  const attentionCount=patients.filter(p=>p.status==="attention").length;

  async function acknowledge(id){
    try{await acknowledgeAlert(id);}
    catch(e){Alert.alert("Could not acknowledge alert",e.message);}
  }

  return <Screen refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshCaregiver} tintColor={colors.purple}/>}>
    <AppHeader title={`Hello, ${firstName}`} subtitle="Your care-circle overview."/>
    <View style={styles.metrics}>
      <Card style={styles.metric}><Caption>Linked patients</Caption><Heading style={styles.number}>{patients.length}</Heading></Card>
      <Card style={[styles.metric,attentionCount>0&&styles.attentionMetric]}><Caption>Need attention</Caption><Heading style={[styles.number,attentionCount>0&&styles.danger]}>{attentionCount}</Heading></Card>
    </View>

    <View style={styles.sectionHeader}><Heading>Active alerts</Heading><StatusChip status={alerts.length?"attention":"safe"} label={alerts.length?`${alerts.length} active`:"All clear"}/></View>
    {alerts.length?alerts.map(alert=><Card key={alert.id} style={styles.alertCard}>
      <View style={styles.alertTop}><View style={styles.alertCopy}>
        <Heading>{alert.patientName||"Patient needs attention"}</Heading>
        <Caption>{formatRelativeTime(alert.createdAt)}</Caption>
      </View><StatusChip status="attention" label="Check-in missed"/></View>
      <Body style={styles.alertMessage}>{alert.message||"No recent safety check-in has been recorded."}</Body>
      <View style={styles.actions}>
        <AppButton compact title="View patient" variant="outline" onPress={()=>router.push(`/patient/${alert.patientId}`)} style={styles.flex}/>
        <AppButton compact title="Acknowledge" onPress={()=>acknowledge(alert.id)} style={styles.flex}/>
      </View>
    </Card>):<Card style={styles.safeCard}><Heading>Everyone is currently within their safety window</Heading>
      <Body style={styles.safeText}>WellNest will surface an alert here when a linked patient misses their configured check-in threshold.</Body></Card>}

    <View style={styles.sectionHeader}><Heading>Patients</Heading><AppButton compact title="Link patient" variant="secondary" onPress={()=>router.push("/pairing")}/></View>
    {patients.length?patients.slice(0,3).map(patient=><PatientCard key={patient.id} patient={patient} onPress={()=>router.push(`/patient/${patient.id}`)}/>)
      :<EmptyState title="No linked patients" message="Enter a patient’s temporary six-digit pairing code to create a secure care relationship." actionTitle="Enter pairing code" onAction={()=>router.push("/pairing")}/>}
    {patients.length>3?<AppButton title="View all patients" variant="outline" onPress={()=>router.push("/(caregiver)/patients")}/>:null}
  </Screen>;
}
const styles=StyleSheet.create({
  metrics:{flexDirection:"row",gap:spacing.md},metric:{flex:1,padding:spacing.md},
  attentionMetric:{backgroundColor:colors.dangerSoft,borderColor:colors.dangerSoft},
  number:{color:colors.purpleDark,fontSize:30,marginTop:spacing.xs},danger:{color:colors.danger},
  sectionHeader:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",gap:spacing.md,marginTop:spacing.md,marginBottom:spacing.md},
  alertCard:{borderColor:colors.danger,backgroundColor:colors.dangerSoft},
  alertTop:{flexDirection:"row",alignItems:"flex-start",gap:spacing.md},alertCopy:{flex:1},
  alertMessage:{marginVertical:spacing.md},actions:{flexDirection:"row",gap:spacing.sm},flex:{flex:1},
  safeCard:{backgroundColor:colors.sageSoft,borderColor:colors.sageSoft},safeText:{marginTop:spacing.sm,color:colors.sageDark}
});
