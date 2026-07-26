import { useEffect,useState } from "react";
import { Alert,Share,StyleSheet,Text,View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "../src/components/AppButton";
import { AppInput } from "../src/components/AppInput";
import { Card } from "../src/components/Card";
import { Screen } from "../src/components/Screen";
import { Body,Caption,Heading } from "../src/components/Typography";
import { colors,radius,spacing,typography } from "../src/constants/theme";
import { useAuth } from "../src/context/AuthContext";
import { useWellness } from "../src/context/WellnessContext";

export default function PairingScreen(){
  const {role}=useAuth();
  const {pairingCode,generatePairingCode,redeemPairingCode,refreshCaregiver}=useWellness();
  const [code,setCode]=useState("");
  const [busy,setBusy]=useState(false);

  useEffect(()=>{if(role==="patient"&&!pairingCode) generatePairingCode().catch(()=>null);},[role,pairingCode,generatePairingCode]);

  async function create(){
    setBusy(true);
    try{await generatePairingCode();}
    catch(e){Alert.alert("Could not create code",e.message);}
    finally{setBusy(false);}
  }
  async function share(){
    if(!pairingCode?.code) return;
    await Share.share({message:`Use this WellNest pairing code: ${pairingCode.code}. It expires in about 10 minutes.`});
  }
  async function redeem(){
    if(!/^\d{6}$/.test(code.trim())){Alert.alert("Enter six digits","The pairing code should contain exactly six numbers.");return;}
    setBusy(true);
    try{
      await redeemPairingCode(code.trim());
      await refreshCaregiver();
      Alert.alert("Patient linked","The care relationship is now active.",[{text:"Continue",onPress:()=>router.replace("/(caregiver)/dashboard")}]);
    }catch(e){Alert.alert("Could not link patient",e.message);}
    finally{setBusy(false);}
  }

  return <Screen>
    {role==="patient"?<>
      <Card style={styles.hero}><Caption style={styles.light}>Temporary caregiver code</Caption>
        <Heading style={styles.lightHeading}>Share this code only with someone you trust</Heading>
        <View style={styles.codeBox}><Text selectable style={styles.code}>{pairingCode?.code||"••••••"}</Text></View>
        <Body style={styles.light}>The Firebase function expires codes after 10 minutes and permits one successful use.</Body>
        <View style={styles.actions}><AppButton title="Share code" variant="sage" onPress={share} disabled={!pairingCode?.code} style={styles.flex}/>
          <AppButton title="New code" variant="outline" onPress={create} loading={busy} style={[styles.flex,styles.lightOutline]}/></View>
      </Card>
      <Card><Heading>What the caregiver can see</Heading>
        <Body style={styles.bodyGap}>Linked caregivers can view your latest check-in, mood summaries, current medication schedule, and active safety alerts.</Body>
        <Caption>You can remove access at any time from Profile → Care circle.</Caption>
      </Card>
    </>:<>
      <Card><Heading>Link a patient</Heading><Body style={styles.bodyGap}>Ask the patient to open their pairing screen and tell you the temporary six-digit code.</Body>
        <AppInput label="Pairing code" value={code} onChangeText={text=>setCode(text.replace(/\D/g,"").slice(0,6))}
          placeholder="000000" keyboardType="number-pad" autoCapitalize="none"/>
        <AppButton title="Link patient" onPress={redeem} loading={busy} disabled={code.length!==6}/>
      </Card>
      <Card style={styles.info}><Heading>Privacy first</Heading><Body style={styles.bodyGap}>A pairing code creates a specific patient–caregiver relationship. It does not give access to any unrelated account.</Body></Card>
    </>}
  </Screen>;
}
const styles=StyleSheet.create({
  hero:{backgroundColor:colors.purple,borderColor:colors.purple},light:{color:"#EEEAFB"},lightHeading:{color:colors.white,marginTop:spacing.xs},
  codeBox:{backgroundColor:colors.white,borderRadius:radius.lg,padding:spacing.lg,marginVertical:spacing.lg,alignItems:"center"},
  code:{fontFamily:typography.headingBold,fontSize:38,letterSpacing:8,color:colors.purpleDark},
  actions:{flexDirection:"row",gap:spacing.sm,marginTop:spacing.lg},flex:{flex:1},lightOutline:{borderColor:colors.white},
  bodyGap:{marginVertical:spacing.md},info:{backgroundColor:colors.sageSoft,borderColor:colors.sageSoft}
});
