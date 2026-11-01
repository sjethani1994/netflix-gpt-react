// Maps Firebase auth error codes to user-friendly messages
const messages = {
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/weak-password": "Password is too weak.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/network-request-failed": "Network error. Check your connection.",
};

export const getAuthErrorMessage = (error) =>
  messages[error?.code] || "Something went wrong. Please try again.";
