import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../constants/theme";
const moods=[{value:1,emoji:"😢",label:"Very low"},{value:2,emoji:"😟",label:"Low"},{value:3,emoji:"😐",label:"Okay"},{value:4,emoji:"🙂",label:"Good"},{value:5,emoji:"😄",label:"Great"}];
export function MoodSelector({value,onChange}){
  return <View style={styles.row}>{moods.map(m=>{const selected=m.value===value;return <Pressable key={m.value}
    accessibilityRole="radio" accessibilityState={{selected}} accessibilityLabel={m.label} onPress={()=>onChange(m.value)}
    style={({pressed})=>[styles.item,selected&&styles.selected,pressed&&styles.pressed]}>
    <Text style={styles.emoji}>{m.emoji}</Text><Text style={[styles.label,selected&&styles.selectedLabel]}>{m.label}</Text>
  </Pressable>;})}</View>;
}
const styles=StyleSheet.create({
  row:{flexDirection:"row",justifyContent:"space-between",gap:spacing.xs},item:{flex:1,minHeight:84,alignItems:"center",justifyContent:"center",
    borderRadius:radius.md,borderWidth:1,borderColor:colors.border,backgroundColor:colors.background,padding:spacing.xs},
  selected:{borderColor:colors.purple,backgroundColor:colors.purpleSoft},pressed:{opacity:.78},emoji:{fontSize:28},
  label:{color:colors.textMuted,fontFamily:typography.body,fontSize:10,textAlign:"center",marginTop:spacing.xs},
  selectedLabel:{color:colors.purpleDark,fontFamily:typography.bodyBold}
});
