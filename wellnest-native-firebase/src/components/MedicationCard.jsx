import { Alert, StyleSheet, View } from "react-native";
import { colors, spacing, typography } from "../constants/theme";
import { AppButton } from "./AppButton";
import { Card } from "./Card";
import { StatusChip } from "./StatusChip";
import { Body, Caption, Heading } from "./Typography";
export function MedicationCard({medication,onTake,onDelete,compact=false}){
  const status=medication.takenToday?"safe":medication.status==="due"?"due":"upcoming";
  return <Card style={compact&&styles.compactCard}>
    <View style={styles.topRow}><View style={styles.copy}><Heading>{medication.name}</Heading><Body style={styles.dosage}>{medication.dosage}</Body></View>
      <StatusChip status={status} label={medication.takenToday?"Taken":medication.time}/></View>
    <Caption>{medication.instructions||"No special instructions"}</Caption>
    <Caption style={styles.remaining}>{Number(medication.remainingDoses||0)} doses remaining</Caption>
    {!compact?<View style={styles.actions}>
      <AppButton compact title={medication.takenToday?"Dose recorded":"Take now"} variant={medication.takenToday?"outline":"sage"}
        disabled={medication.takenToday} onPress={()=>onTake?.(medication.id)} style={styles.primaryAction}/>
      {onDelete?<AppButton compact title="Remove" variant="danger" onPress={()=>Alert.alert("Remove medication?",`This removes ${medication.name} and its reminder.`,[
        {text:"Cancel",style:"cancel"},{text:"Remove",style:"destructive",onPress:()=>onDelete(medication.id)}
      ])}/>:null}
    </View>:null}
  </Card>;
}
const styles=StyleSheet.create({
  compactCard:{padding:spacing.md},topRow:{flexDirection:"row",alignItems:"flex-start",gap:spacing.md},copy:{flex:1},
  dosage:{color:colors.purpleDark,fontFamily:typography.bodyBold,marginTop:2},remaining:{marginTop:spacing.sm},
  actions:{flexDirection:"row",gap:spacing.sm,marginTop:spacing.md},primaryAction:{flex:1}
});
