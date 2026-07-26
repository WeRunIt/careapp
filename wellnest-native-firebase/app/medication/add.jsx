import { useState } from "react";
import { Alert,StyleSheet } from "react-native";
import { router } from "expo-router";
import { AppButton } from "../../src/components/AppButton";
import { AppInput } from "../../src/components/AppInput";
import { Card } from "../../src/components/Card";
import { Screen } from "../../src/components/Screen";
import { Body } from "../../src/components/Typography";
import { colors,spacing } from "../../src/constants/theme";
import { useWellness } from "../../src/context/WellnessContext";
import { parseTimeString } from "../../src/utils/date";
import { normalizeError } from "../../src/utils/validation";

export default function AddMedicationScreen(){
  const {addMedication}=useWellness();
  const [loading,setLoading]=useState(false);
  const [form,setForm]=useState({name:"",dosage:"",instructions:"",time:"08:00",remainingDoses:"30"});
  const [error,setError]=useState("");
  const update=(key,value)=>setForm(v=>({...v,[key]:value}));
  async function save(){
    setError("");
    if(!form.name.trim()||!form.dosage.trim()){setError("Medication name and dosage are required.");return;}
    if(!parseTimeString(form.time)){setError("Use a 24-hour time such as 08:30 or 20:00.");return;}
    const remaining=Number(form.remainingDoses);
    if(!Number.isInteger(remaining)||remaining<0){setError("Remaining doses must be zero or more.");return;}
    setLoading(true);
    try{
      await addMedication({...form,remainingDoses:remaining});
      Alert.alert("Medication added","The schedule was saved. Allow notifications to receive reminders.");router.back();
    }catch(e){setError(normalizeError(e));}finally{setLoading(false);}
  }
  return <Screen>
    <Body style={styles.intro}>Enter exactly what appears on the medication label. This app does not replace instructions from a doctor or pharmacist.</Body>
    <Card>
      <AppInput label="Medication name" value={form.name} onChangeText={v=>update("name",v)} placeholder="Example: Metformin"/>
      <AppInput label="Dosage" value={form.dosage} onChangeText={v=>update("dosage",v)} placeholder="Example: 500 mg"/>
      <AppInput label="Daily reminder time" value={form.time} onChangeText={v=>update("time",v)} keyboardType="numbers-and-punctuation" placeholder="08:00" hint="Use 24-hour time."/>
      <AppInput label="Remaining doses" value={form.remainingDoses} onChangeText={v=>update("remainingDoses",v)} keyboardType="number-pad" placeholder="30"/>
      <AppInput label="Instructions" value={form.instructions} onChangeText={v=>update("instructions",v)} multiline placeholder="Example: Take with breakfast" error={error}/>
      <AppButton title="Save medication" loading={loading} onPress={save}/>
    </Card>
  </Screen>;
}
const styles=StyleSheet.create({intro:{color:colors.textMuted,marginBottom:spacing.lg}});
