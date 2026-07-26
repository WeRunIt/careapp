import { useState } from "react";
import { Alert,Pressable,StyleSheet,Text,View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "../../src/components/AppButton";
import { AppInput } from "../../src/components/AppInput";
import { Card } from "../../src/components/Card";
import { Screen } from "../../src/components/Screen";
import { Body,Caption,Title } from "../../src/components/Typography";
import { colors,radius,spacing,typography } from "../../src/constants/theme";
import { useAuth } from "../../src/context/AuthContext";
import { isValidEmail,normalizeError } from "../../src/utils/validation";

export default function LoginScreen(){
  const {login,loading,isMockMode,resetPassword}=useAuth();
  const [email,setEmail]=useState(isMockMode?"patient@demo.com":"");
  const [password,setPassword]=useState(isMockMode?"Password1":"");
  const [demoRole,setDemoRole]=useState("patient");
  const [error,setError]=useState("");

  async function handleLogin(){
    setError("");
    if(!isValidEmail(email)){setError("Enter a valid email address.");return;}
    if(!password){setError("Enter your password.");return;}
    try{
      const u=await login({email,password,demoRole});
      router.replace(u.role==="caregiver"?"/(caregiver)/dashboard":"/(patient)/home");
    }catch(e){setError(normalizeError(e));}
  }
  async function handleReset(){
    if(!isValidEmail(email)){Alert.alert("Enter your email","Add your account email first.");return;}
    try{await resetPassword(email);Alert.alert("Password reset",isMockMode?"Mock mode does not send emails.":"Check your email for a reset link.");}
    catch(e){Alert.alert("Could not reset password",normalizeError(e));}
  }

  return <Screen contentContainerStyle={styles.screen}>
    <View style={styles.brandMark}><Text style={styles.brandSymbol}>W</Text></View>
    <Title style={styles.title}>Welcome to WellNest</Title>
    <Body style={styles.subtitle}>Medication support, daily wellness, and a gentle safety connection.</Body>
    <Card>
      {isMockMode?<><Caption style={styles.demoTitle}>Prototype account</Caption><View style={styles.roleRow}>
        {["patient","caregiver"].map(role=><Pressable key={role} onPress={()=>{setDemoRole(role);setEmail(`${role}@demo.com`);}}
          style={[styles.roleOption,demoRole===role&&styles.roleSelected]}>
          <Text style={[styles.roleText,demoRole===role&&styles.roleTextSelected]}>{role==="patient"?"Patient":"Caregiver"}</Text>
        </Pressable>)}
      </View></>:null}
      <AppInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoComplete="email" placeholder="name@example.com"/>
      <AppInput label="Password" value={password} onChangeText={setPassword} secureTextEntry autoComplete="current-password" placeholder="Your password" error={error}/>
      <AppButton title="Sign in" loading={loading} onPress={handleLogin}/>
      <Pressable onPress={handleReset} style={styles.link}><Text style={styles.linkText}>Forgot password?</Text></Pressable>
    </Card>
    <View style={styles.footerRow}><Caption>New to WellNest?</Caption><Pressable onPress={()=>router.push("/signup")}><Text style={styles.linkText}> Create account</Text></Pressable></View>
  </Screen>;
}
const styles=StyleSheet.create({
  screen:{flexGrow:1,justifyContent:"center",maxWidth:520,width:"100%",alignSelf:"center"},
  brandMark:{width:64,height:64,borderRadius:22,backgroundColor:colors.purple,alignItems:"center",justifyContent:"center",marginBottom:spacing.lg},
  brandSymbol:{color:colors.white,fontFamily:typography.headingBold,fontSize:30},title:{marginBottom:spacing.sm},
  subtitle:{color:colors.textMuted,marginBottom:spacing.xl},demoTitle:{color:colors.purpleDark,fontFamily:typography.bodyBold,marginBottom:spacing.sm},
  roleRow:{flexDirection:"row",gap:spacing.sm,marginBottom:spacing.lg},roleOption:{flex:1,borderRadius:radius.md,borderWidth:1,borderColor:colors.border,padding:spacing.md,alignItems:"center"},
  roleSelected:{backgroundColor:colors.purpleSoft,borderColor:colors.purple},roleText:{color:colors.text,fontFamily:typography.bodyMedium},
  roleTextSelected:{color:colors.purpleDark,fontFamily:typography.bodyBold},link:{minHeight:44,alignItems:"center",justifyContent:"center",marginTop:spacing.sm},
  linkText:{color:colors.purpleDark,fontFamily:typography.bodyBold,fontSize:14},footerRow:{flexDirection:"row",justifyContent:"center",alignItems:"center"}
});
