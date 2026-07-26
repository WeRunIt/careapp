import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { configureNotificationChannels,requestNotificationsAndSaveToken } from "../services/notificationService";
export function NotificationBootstrap(){
  const {user}=useAuth();
  useEffect(()=>{configureNotificationChannels().catch(console.error);},[]);
  useEffect(()=>{if(user?.uid) requestNotificationsAndSaveToken(user.uid).catch(console.error);},[user?.uid]);
  return null;
}
