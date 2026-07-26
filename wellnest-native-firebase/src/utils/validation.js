export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}
export function validatePassword(value) {
  const password=String(value||"");
  if(password.length<8) return "Use at least 8 characters.";
  if(!/[A-Za-z]/.test(password)||!/\d/.test(password)) return "Include at least one letter and one number.";
  return null;
}
export function normalizeError(error) {
  const known={
    "auth/email-already-in-use":"An account already uses this email.",
    "auth/invalid-email":"Enter a valid email address.",
    "auth/invalid-credential":"The email or password is incorrect.",
    "auth/user-not-found":"No account was found for this email.",
    "auth/wrong-password":"The email or password is incorrect.",
    "auth/weak-password":"Use a stronger password.",
    "functions/permission-denied":"You do not have permission to do that.",
    "functions/not-found":"That item could not be found.",
    "functions/failed-precondition":"Complete the required setup first."
  };
  return known[error?.code]||error?.message||"Something went wrong. Try again.";
}
