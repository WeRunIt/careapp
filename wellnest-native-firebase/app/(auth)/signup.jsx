import { useState } from "react";
import { Pressable,StyleSheet,Text,View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "../../src/components/AppButton";
import { AppInput } from "../../src/components/AppInput";
import { Card } from "../../src/components/Card";
import { Screen } from "../../src/components/Screen";
import { Body,Caption,Title } from "../../src/components/Typography";
import { colors,radius,spacing,typography } from "../../src/constants/theme";
import { useAuth } from "../../src/context/AuthContext";
import { isValidEmail,normalizeError,validatePassword } from "../../src/utils/validation";

export default function SignupScreen(){
  const {register,loading}=useAuth();
  const [role,setRole]=useState("patient");
  const [form,setForm]=useState({fullName:"",email:"",password:"",confirmPassword:"",relation:""});
  const [error,setError]=useState("");
  const update=(key,value)=>setForm(v=>({...v,[key]:value}));
  async function submit(){
    setError("");
    if(form.fullName.trim().length<2){setError("Enter your full name.");return;}
    if(!isValidEmail(form.email)){setError("Enter a valid email address.");return;}
    const pe=validatePassword(form.password);if(pe){setError(pe);return;}
    if(form.password!==form.confirmPassword){setError("The passwords do not match.");return;}
    try{
      const u=await register({...form,role,relation:role==="caregiver"?form.relation:null});
      router.replace(u.role==="caregiver"?"/(caregiver)/dashboard":"/(patient)/home");
    }catch(e){setError(normalizeError(e));}
  }
  return <Screen contentContainerStyle={styles.screen}>
    <Title>Create your account</Title><Body style={styles.subtitle}>Choose the view that matches how you will use WellNest.</Body>
    <View style={styles.roleRow}>{[
      {value:"patient",title:"Patient",description:"Track my own health"},
      {value:"caregiver",title:"Caregiver",description:"Support linked patients"}
    ].map(o=><Pressable key={o.value} onPress={()=>setRole(o.value)} style={[styles.roleCard,role===o.value&&styles.roleSelected]}>
      <Text style={[styles.roleTitle,role===o.value&&styles.roleTitleSelected]}>{o.title}</Text><Caption>{o.description}</Caption>
    </Pressable>)}</View>
    <Card>
      <AppInput label="Full name" value={form.fullName} onChangeText={v=>update("fullName",v)} placeholder="Your full name"/>
      <AppInput label="Email" value={form.email} onChangeText={v=>update("email",v)} keyboardType="email-address" autoCapitalize="none" placeholder="name@example.com"/>
      {role==="caregiver"?<AppInput label="Relation to patient" value={form.relation} onChangeText={v=>update("relation",v)} placeholder="Example: daughter, neighbor"/>:null}
      <AppInput label="Password" value={form.password} onChangeText={v=>update("password",v)} secureTextEntry placeholder="At least 8 characters"/>
      <AppInput label="Confirm password" value={form.confirmPassword} onChangeText={v=>update("confirmPassword",v)} secureTextEntry placeholder="Repeat password" error={error}/>
      <AppButton title="Create account" loading={loading} onPress={submit}/>
    </Card>
    <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>Back to sign in</Text></Pressable>
  </Screen>;
}
const styles=StyleSheet.create({
  screen:{maxWidth:580,width:"100%",alignSelf:"center"},subtitle:{color:colors.textMuted,marginTop:spacing.sm,marginBottom:spacing.lg},
  roleRow:{flexDirection:"row",gap:spacing.sm,marginBottom:spacing.md},roleCard:{flex:1,borderRadius:radius.lg,borderWidth:1,borderColor:colors.border,backgroundColor:colors.surface,padding:spacing.md},
  roleSelected:{borderColor:colors.purple,backgroundColor:colors.purpleSoft},roleTitle:{color:colors.text,fontFamily:typography.heading,fontSize:17},
  roleTitleSelected:{color:colors.purpleDark},back:{minHeight:44,alignItems:"center",justifyContent:"center"},backText:{color:colors.purpleDark,fontFamily:typography.bodyBold}
});
