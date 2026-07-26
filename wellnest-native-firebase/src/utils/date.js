export function formatFriendlyDate(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat("en", {weekday:"long",month:"long",day:"numeric"}).format(date);
}
export function toDate(value) {
  if (!value) return null;
  if (typeof value?.toDate === "function") return value.toDate();
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}
export function formatTime(value) {
  const date=toDate(value); if(!date) return "Not yet";
  return new Intl.DateTimeFormat("en",{hour:"numeric",minute:"2-digit"}).format(date);
}
export function formatRelativeTime(value) {
  const date=toDate(value); if(!date) return "No check-in yet";
  const minutes=Math.max(0,Math.floor((Date.now()-date.getTime())/60000));
  if(minutes<1) return "Just now";
  if(minutes<60) return `${minutes} min ago`;
  const hours=Math.floor(minutes/60);
  if(hours<24) return `${hours} hr${hours===1?"":"s"} ago`;
  const days=Math.floor(hours/24);
  return `${days} day${days===1?"":"s"} ago`;
}
export function parseTimeString(value) {
  const match=String(value||"").trim().match(/^(\d{1,2}):(\d{2})$/);
  if(!match) return null;
  const hour=Number(match[1]), minute=Number(match[2]);
  return hour>=0&&hour<=23&&minute>=0&&minute<=59?{hour,minute}:null;
}
