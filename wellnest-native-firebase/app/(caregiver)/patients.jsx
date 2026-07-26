import { useMemo,useState } from "react";
import { StyleSheet,TextInput,View } from "react-native";
import { router } from "expo-router";
import { AppHeader } from "../../src/components/AppHeader";
import { EmptyState } from "../../src/components/EmptyState";
import { PatientCard } from "../../src/components/PatientCard";
import { Screen } from "../../src/components/Screen";
import { colors,radius,spacing,typography } from "../../src/constants/theme";
import { useWellness } from "../../src/context/WellnessContext";

export default function PatientsScreen(){
  const {patients}=useWellness();
  const [query,setQuery]=useState("");
  const visible=useMemo(()=>patients
    .filter(p=>String(p.fullName||"").toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a,b)=>a.status===b.status?String(a.fullName).localeCompare(String(b.fullName)):a.status==="attention"?-1:1)
  ,[patients,query]);

  return <Screen>
    <AppHeader title="My patients" subtitle="Patients needing attention are shown first."/>
    <View style={styles.searchWrap}><TextInput value={query} onChangeText={setQuery} placeholder="Search by name"
      placeholderTextColor={colors.textMuted} style={styles.search} accessibilityLabel="Search linked patients"/></View>
    {visible.length?visible.map(patient=><PatientCard key={patient.id} patient={patient} onPress={()=>router.push(`/patient/${patient.id}`)}/>)
      :<EmptyState title={patients.length?"No matching patient":"No linked patients"} message={patients.length?"Try a different name.":"Pair with a patient to view permitted wellness information."}/>}
  </Screen>;
}
const styles=StyleSheet.create({
  searchWrap:{marginBottom:spacing.lg},
  search:{minHeight:52,borderWidth:1,borderColor:colors.border,borderRadius:radius.md,backgroundColor:colors.surface,
    paddingHorizontal:spacing.md,color:colors.text,fontFamily:typography.body,fontSize:16}
});
