const now=Date.now();
export const mockPatientUser={
  uid:"demo-patient",email:"patient@demo.com",fullName:"Maya Haddad",role:"patient",
  alertThresholdHours:6,emergencyContact:{name:"Rami Haddad",phone:"+961 70 000 000"}
};
export const mockCaregiverUser={
  uid:"demo-caregiver",email:"caregiver@demo.com",fullName:"Rami Haddad",role:"caregiver"
};
export const initialMedications=[
  {id:"med-1",name:"Metformin",dosage:"500 mg",instructions:"Take with breakfast",time:"08:00",remainingDoses:24,status:"due",takenToday:false},
  {id:"med-2",name:"Vitamin D",dosage:"1 tablet",instructions:"Take after lunch",time:"13:00",remainingDoses:18,status:"upcoming",takenToday:false},
  {id:"med-3",name:"Blood pressure tablet",dosage:"5 mg",instructions:"Take with water",time:"20:00",remainingDoses:12,status:"upcoming",takenToday:false}
];
export const initialMoodLogs=[
  {id:"mood-1",mood:4,notes:"Had breakfast and slept well.",habits:{sleep:true,breakfast:true,lunch:true,dinner:true,medications:true,movement:true},createdAt:new Date(now-86400000).toISOString()},
  {id:"mood-2",mood:3,notes:"A quiet day.",habits:{sleep:true,breakfast:false,lunch:true,dinner:true,medications:true,movement:false},createdAt:new Date(now-2*86400000).toISOString()}
];
export const initialCheckIns=[{id:"check-1",status:"okay",createdAt:new Date(now-90*60000).toISOString()}];
export const initialCaregivers=[{id:"demo-patient_demo-caregiver",caregiverId:"demo-caregiver",fullName:"Rami Haddad",relation:"Son",status:"active"}];
export const initialPatients=[
  {id:"demo-patient",linkId:"demo-patient_demo-caregiver",fullName:"Maya Haddad",lastCheckInAt:new Date(now-90*60000).toISOString(),latestMood:4,nextMedication:{name:"Vitamin D",time:"13:00"},alertThresholdHours:6,status:"safe"},
  {id:"demo-patient-2",linkId:"demo-patient-2_demo-caregiver",fullName:"Nadia Salem",lastCheckInAt:new Date(now-8*60*60000).toISOString(),latestMood:2,nextMedication:{name:"Heart medication",time:"12:00"},alertThresholdHours:6,status:"attention"}
];
export const initialAlerts=[
  {id:"alert-1",patientId:"demo-patient-2",patientName:"Nadia Salem",type:"missed_check_in",message:"No check-in has been recorded for more than 6 hours.",status:"active",acknowledgedAt:null,createdAt:new Date(now-30*60000).toISOString()}
];
