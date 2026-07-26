const fs=require("fs");
const required=["package.json","app.config.js","firebase.json","firestore.rules","functions/package.json"];
let failed=false;
for(const file of required){if(!fs.existsSync(file)){console.error(`Missing: ${file}`);failed=true;}}
if(!fs.existsSync("google-services.json")) console.warn("google-services.json is missing. Mock mode can run; real Firebase cannot.");
if(process.env.EXPO_PUBLIC_USE_MOCK_DATA!=="false") console.warn("Mock mode is active.");
if(failed) process.exit(1);
console.log("WellNest structure looks complete.");
