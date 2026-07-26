import { router } from "expo-router";
import { StyleSheet,View } from "react-native";
import { AppButton } from "../../src/components/AppButton";
import { AppHeader } from "../../src/components/AppHeader";
import { EmptyState } from "../../src/components/EmptyState";
import { MedicationCard } from "../../src/components/MedicationCard";
import { Screen } from "../../src/components/Screen";
import { Caption } from "../../src/components/Typography";
import { spacing } from "../../src/constants/theme";
import { useWellness } from "../../src/context/WellnessContext";

export default function MedicationsScreen(){
  const {medications,markMedicationTaken,removeMedication}=useWellness();
  return <Screen>
    <AppHeader title="Medications" subtitle="Today’s schedule and remaining doses."
      right={<AppButton compact title="+ Add" onPress={()=>router.push("/medication/add")}/>}/>
    <View style={styles.summary}><Caption>{medications.filter(x=>x.takenToday).length} taken today</Caption>
      <Caption>{medications.filter(x=>!x.takenToday).length} remaining</Caption></View>
    {medications.length?medications.map(m=><MedicationCard key={m.id} medication={m} onTake={markMedicationTaken} onDelete={removeMedication}/>)
      :<EmptyState title="No medications" message="Add a medication to create a simple daily schedule."
        actionTitle="Add medication" onAction={()=>router.push("/medication/add")}/>}
  </Screen>;
}
const styles=StyleSheet.create({summary:{flexDirection:"row",justifyContent:"space-between",marginBottom:spacing.md}});
