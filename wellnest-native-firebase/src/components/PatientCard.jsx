import { Pressable, StyleSheet, View } from "react-native";
import { colors, radius, spacing } from "../constants/theme";
import { formatRelativeTime } from "../utils/date";
import { StatusChip } from "./StatusChip";
import { Body, Caption, Heading } from "./Typography";
export function PatientCard({patient,onPress}){
  return <Pressable accessibilityRole="button" onPress={onPress} style={({pressed})=>[
    styles.card,patient.status==="attention"&&styles.attention,pressed&&styles.pressed
  ]}>
    <View style={styles.top}><View style={styles.copy}><Heading>{patient.fullName||"Patient"}</Heading>
      <Caption>Last check-in: {formatRelativeTime(patient.lastCheckInAt)}</Caption></View>
      <StatusChip status={patient.status} label={patient.status==="attention"?"Check now":"Safe"}/></View>
    <View style={styles.metrics}><Body>Mood: {patient.latestMood?`${patient.latestMood}/5`:"Not logged"}</Body>
      <Body>Next: {patient.nextMedication?`${patient.nextMedication.name} at ${patient.nextMedication.time}`:"No medication"}</Body></View>
  </Pressable>;
}
const styles=StyleSheet.create({
  card:{backgroundColor:colors.surface,borderColor:colors.border,borderWidth:1,borderRadius:radius.lg,padding:spacing.lg,marginBottom:spacing.md},
  attention:{borderColor:colors.danger,backgroundColor:colors.dangerSoft},pressed:{opacity:.82},
  top:{flexDirection:"row",alignItems:"flex-start",gap:spacing.md},copy:{flex:1},metrics:{gap:spacing.xs,marginTop:spacing.md}
});
