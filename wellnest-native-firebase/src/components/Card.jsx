import { StyleSheet, View } from "react-native";
import { colors, radius, shadow, spacing } from "../constants/theme";
export function Card({children,style,...props}){return <View style={[styles.card,style]} {...props}>{children}</View>;}
const styles=StyleSheet.create({
  card:{backgroundColor:colors.surface,borderColor:colors.border,borderWidth:1,borderRadius:radius.lg,
    padding:spacing.lg,marginBottom:spacing.md,...shadow}
});
