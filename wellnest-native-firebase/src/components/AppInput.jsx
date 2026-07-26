import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radius, spacing, typography } from "../constants/theme";
export function AppInput({label,error,hint,style,multiline=false,...props}){
  return <View style={styles.wrapper}>
    {label?<Text style={styles.label}>{label}</Text>:null}
    <TextInput placeholderTextColor={colors.textMuted} multiline={multiline}
      style={[styles.input,multiline&&styles.multiline,error&&styles.inputError,style]} {...props}/>
    {error?<Text style={styles.error}>{error}</Text>:!error&&hint?<Text style={styles.hint}>{hint}</Text>:null}
  </View>;
}
const styles=StyleSheet.create({
  wrapper:{marginBottom:spacing.md},label:{color:colors.text,fontFamily:typography.bodyMedium,fontSize:14,marginBottom:spacing.sm},
  input:{minHeight:52,borderRadius:radius.md,borderWidth:1,borderColor:colors.border,backgroundColor:colors.surface,
    color:colors.text,fontFamily:typography.body,fontSize:16,paddingHorizontal:spacing.md,paddingVertical:spacing.sm},
  multiline:{minHeight:110,textAlignVertical:"top",paddingTop:spacing.md},inputError:{borderColor:colors.danger},
  error:{color:colors.danger,fontFamily:typography.body,fontSize:13,marginTop:spacing.xs},
  hint:{color:colors.textMuted,fontFamily:typography.body,fontSize:13,marginTop:spacing.xs}
});
