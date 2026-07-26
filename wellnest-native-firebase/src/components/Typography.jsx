import { StyleSheet, Text } from "react-native";
import { colors, typography } from "../constants/theme";
export const Title=({children,style,...props})=><Text style={[styles.title,style]} {...props}>{children}</Text>;
export const Heading=({children,style,...props})=><Text style={[styles.heading,style]} {...props}>{children}</Text>;
export const Body=({children,style,...props})=><Text style={[styles.body,style]} {...props}>{children}</Text>;
export const Caption=({children,style,...props})=><Text style={[styles.caption,style]} {...props}>{children}</Text>;
const styles=StyleSheet.create({
  title:{color:colors.text,fontFamily:typography.headingBold,fontSize:30,lineHeight:38},
  heading:{color:colors.text,fontFamily:typography.heading,fontSize:20,lineHeight:28},
  body:{color:colors.text,fontFamily:typography.body,fontSize:16,lineHeight:24},
  caption:{color:colors.textMuted,fontFamily:typography.body,fontSize:13,lineHeight:19}
});
