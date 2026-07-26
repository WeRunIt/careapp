import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../constants/theme";
const palettes={
  safe:{background:colors.successSoft,text:colors.success},attention:{background:colors.dangerSoft,text:colors.danger},
  upcoming:{background:colors.purpleSoft,text:colors.purpleDark},due:{background:colors.warningSoft,text:colors.warning},
  neutral:{background:colors.surfaceSoft,text:colors.textMuted}
};
export function StatusChip({label,status="neutral"}){
  const p=palettes[status]||palettes.neutral;
  return <View style={[styles.chip,{backgroundColor:p.background}]}><Text style={[styles.text,{color:p.text}]}>{label}</Text></View>;
}
const styles=StyleSheet.create({chip:{alignSelf:"flex-start",borderRadius:radius.pill,paddingHorizontal:spacing.md,paddingVertical:6},text:{fontFamily:typography.bodyBold,fontSize:12}});
