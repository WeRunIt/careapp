import { StyleSheet, View } from "react-native";
import { spacing } from "../constants/theme";
import { formatFriendlyDate } from "../utils/date";
import { Caption, Title } from "./Typography";
export function AppHeader({title,subtitle,right}){
  return <View style={styles.row}><View style={styles.copy}><Title>{title}</Title><Caption style={styles.subtitle}>{subtitle||formatFriendlyDate()}</Caption></View>{right}</View>;
}
const styles=StyleSheet.create({row:{flexDirection:"row",alignItems:"flex-start",justifyContent:"space-between",marginBottom:spacing.lg,gap:spacing.md},copy:{flex:1},subtitle:{marginTop:spacing.xs}});
