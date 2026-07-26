import { useState } from "react";
import { Alert,StyleSheet,View } from "react-native";
import { AppButton } from "../../src/components/AppButton";
import { AppHeader } from "../../src/components/AppHeader";
import { AppInput } from "../../src/components/AppInput";
import { Card } from "../../src/components/Card";
import { HabitToggle } from "../../src/components/HabitToggle";
import { MoodSelector } from "../../src/components/MoodSelector";
import { Screen } from "../../src/components/Screen";
import { Body,Caption,Heading } from "../../src/components/Typography";
import { colors,spacing } from "../../src/constants/theme";
import { useWellness } from "../../src/context/WellnessContext";
import { formatTime } from "../../src/utils/date";
const labels={sleep:"Slept well",breakfast:"Breakfast",lunch:"Lunch",dinner:"Dinner",medications:"Meds taken",movement:"Movement"};

export default function MoodScreen(){
  const {moodLogs,submitMoodLog}=useWellness();
  const [mood,setMood]=useState(3),[notes,setNotes]=useState(""),[loading,setLoading]=useState(false);
  const empty={sleep:false,breakfast:false,lunch:false,dinner:false,medications:false,movement:false};
  const [habits,setHabits]=useState(empty);
  const toggle=key=>setHabits(v=>({...v,[key]:!v[key]}));
  async function submit(){
    setLoading(true);
    try{await submitMoodLog({mood,habits,notes});setNotes("");setHabits(empty);Alert.alert("Check-in saved","Your mood and habits were recorded.");}
    catch(e){Alert.alert("Could not save",e.message);}finally{setLoading(false);}
  }
  return <Screen>
    <AppHeader title="Mood & habits" subtitle="A gentle daily reflection."/>
    <Card><Heading>How are you feeling?</Heading><Caption style={styles.note}>Choose the closest answer. There is no wrong response.</Caption>
      <MoodSelector value={mood} onChange={setMood}/>
      <Heading style={styles.habitHeading}>What supported you today?</Heading>
      <View style={styles.habits}>{Object.entries(labels).map(([key,label])=><HabitToggle key={key} label={label} selected={habits[key]} onPress={()=>toggle(key)}/>)}</View>
      <AppInput label="Optional note" value={notes} onChangeText={setNotes} multiline placeholder="Anything you want to remember about today?"/>
      <AppButton title="Save today’s check-in" loading={loading} onPress={submit}/>
    </Card>
    <Heading style={styles.historyHeading}>Recent history</Heading>
    {moodLogs.slice(0,7).map(entry=><Card key={entry.id} style={styles.historyCard}>
      <View style={styles.historyRow}><Body style={styles.moodNumber}>Mood {entry.mood}/5</Body><Caption>{formatTime(entry.createdAt)}</Caption></View>
      {entry.notes?<Body>{entry.notes}</Body>:null}
    </Card>)}
    <Card style={styles.insight}><Caption style={styles.insightTitle}>Pattern preview</Caption><Body>
      As more entries are recorded, this section can compare sleep, meals, medication adherence, and mood without claiming a medical diagnosis.
    </Body></Card>
  </Screen>;
}
const styles=StyleSheet.create({
  note:{marginTop:spacing.xs,marginBottom:spacing.md},habitHeading:{marginTop:spacing.lg,marginBottom:spacing.md},
  habits:{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between",gap:spacing.sm,marginBottom:spacing.lg},
  historyHeading:{marginVertical:spacing.md},historyCard:{padding:spacing.md},historyRow:{flexDirection:"row",justifyContent:"space-between",marginBottom:spacing.xs},
  moodNumber:{color:colors.purpleDark},insight:{backgroundColor:colors.blueSoft,borderColor:colors.blueSoft},insightTitle:{color:colors.purpleDark,marginBottom:spacing.sm}
});
