import { useState } from "react";
import { Alert,StyleSheet } from "react-native";
import { router } from "expo-router";
import { AppButton } from "../../src/components/AppButton";
import { AppInput } from "../../src/components/AppInput";
import { Card } from "../../src/components/Card";
import { Screen } from "../../src/components/Screen";
import { Body,Caption,Heading } from "../../src/components/Typography";
import { colors,spacing } from "../../src/constants/theme";
import { useAuth } from "../../src/context/AuthContext";

export default function DeleteAccountScreen(){
  const {deleteAccount}=useAuth();
  const [confirmation,setConfirmation]=useState("");
  const [busy,setBusy]=useState(false);
  async function remove(){
    setBusy(true);
    try{
      await deleteAccount();
      router.replace("/login");
    }catch(e){
      Alert.alert("Account deletion failed",e.message||"Please sign in again, then retry.");
    }finally{setBusy(false);}
  }
  return <Screen>
    <Card style={styles.danger}><Heading>Delete account and associated data</Heading>
      <Body style={styles.gap}>This requests server-side deletion of your profile, wellness records, caregiver relationships, device tokens, and alerts connected to your account.</Body>
      <Caption>This action cannot be undone. Type DELETE below to continue.</Caption>
      <AppInput label="Confirmation" value={confirmation} onChangeText={setConfirmation} autoCapitalize="characters" placeholder="DELETE"/>
      <AppButton title="Permanently delete account" variant="danger" loading={busy} disabled={confirmation.trim().toUpperCase()!=="DELETE"}
        onPress={()=>Alert.alert("Permanently delete your account?","Your WellNest account and associated application data will be removed.",[
          {text:"Cancel",style:"cancel"},
          {text:"Delete permanently",style:"destructive",onPress:remove}
        ])}/>
    </Card>
    <Body style={styles.note}>For the Play Store’s external deletion requirement, deploy the included public/delete-account.html page and connect it to your support process or deletion endpoint.</Body>
  </Screen>;
}
const styles=StyleSheet.create({
  danger:{backgroundColor:colors.dangerSoft,borderColor:colors.danger},gap:{marginVertical:spacing.md},
  note:{color:colors.textMuted,paddingHorizontal:spacing.sm}
});
