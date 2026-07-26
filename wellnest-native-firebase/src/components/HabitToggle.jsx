import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing, typography } from "../constants/theme";
export function HabitToggle({label,selected,onPress}){
  return <Pressable accessibilityRole="checkbox" accessibilityState={{checked:selected}} onPress={onPress}
    style={({pressed})=>[styles.item,selected&&styles.selected,pressed&&styles.pressed]}>
    <Text style={styles.icon}>{selected?"✓":"○"}</Text><Text style={[styles.label,selected&&styles.selectedLabel]}>{label}</Text>
  </Pressable>;
}
const styles=StyleSheet.create({
  item:{width:"48%",minHeight:50,flexDirection:"row",alignItems:"center",borderRadius:radius.md,borderWidth:1,
    borderColor:colors.border,backgroundColor:colors.surface,padding:spacing.md,gap:spacing.sm},
  selected:{backgroundColor:colors.sageSoft,borderColor:colors.sage},pressed:{opacity:.8},
  icon:{color:colors.sageDark,fontSize:20},label:{color:colors.text,fontFamily:typography.bodyMedium,flex:1},
  selectedLabel:{color:colors.sageDark}
});
