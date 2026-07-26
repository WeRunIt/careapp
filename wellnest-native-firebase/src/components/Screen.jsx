import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../constants/theme";

export function Screen({children,scroll=true,contentContainerStyle,style,refreshControl}){
  const content=scroll?(
    <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}
      refreshControl={refreshControl} contentContainerStyle={[styles.content,contentContainerStyle]}>
      {children}
    </ScrollView>
  ):(
    <View style={[styles.content,styles.flex,contentContainerStyle]}>{children}</View>
  );
  return <SafeAreaView style={[styles.safe,style]}>{content}</SafeAreaView>;
}
const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:colors.background},
  content:{padding:spacing.lg,paddingBottom:spacing.xxl},
  flex:{flex:1}
});
