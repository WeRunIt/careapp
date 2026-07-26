import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing, typography } from "../constants/theme";
const variants={
  primary:{bg:colors.purple,border:colors.purple,text:colors.white},
  sage:{bg:colors.sage,border:colors.sage,text:colors.white},
  secondary:{bg:colors.purpleSoft,border:colors.purpleSoft,text:colors.purpleDark},
  outline:{bg:"transparent",border:colors.border,text:colors.text},
  danger:{bg:colors.dangerSoft,border:colors.dangerSoft,text:colors.danger}
};
export function AppButton({title,onPress,variant="primary",loading=false,disabled=false,style,compact=false,accessibilityHint}){
  const p=variants[variant]||variants.primary,isDisabled=disabled||loading;
  return <Pressable accessibilityRole="button" accessibilityLabel={title} accessibilityHint={accessibilityHint}
    disabled={isDisabled} onPress={onPress} style={({pressed})=>[
      styles.button,compact&&styles.compact,{backgroundColor:p.bg,borderColor:p.border,opacity:isDisabled?.5:pressed?.82:1},style
    ]}>
    {loading?<ActivityIndicator color={p.text}/>:<Text style={[styles.text,{color:p.text}]}>{title}</Text>}
  </Pressable>;
}
const styles=StyleSheet.create({
  button:{minHeight:52,borderRadius:radius.md,borderWidth:1,paddingHorizontal:spacing.lg,paddingVertical:spacing.md,alignItems:"center",justifyContent:"center"},
  compact:{minHeight:42,paddingVertical:spacing.sm,paddingHorizontal:spacing.md},
  text:{fontFamily:typography.bodyBold,fontSize:16}
});
