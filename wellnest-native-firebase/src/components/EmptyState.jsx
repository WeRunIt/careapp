import { StyleSheet, View } from "react-native";
import { colors, spacing } from "../constants/theme";
import { AppButton } from "./AppButton";
import { Body, Heading } from "./Typography";
export function EmptyState({title,message,actionTitle,onAction}){
  return <View style={styles.wrapper}><Heading>{title}</Heading><Body style={styles.message}>{message}</Body>
    {actionTitle?<AppButton compact title={actionTitle} variant="secondary" onPress={onAction}/>:null}</View>;
}
const styles=StyleSheet.create({
  wrapper:{alignItems:"center",justifyContent:"center",borderWidth:1,borderStyle:"dashed",borderColor:colors.border,borderRadius:20,padding:spacing.xl,minHeight:180},
  message:{color:colors.textMuted,textAlign:"center",marginVertical:spacing.md}
});
