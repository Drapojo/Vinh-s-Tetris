const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

export const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/auth?scope=openid%20profile%20email&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&client_id=${GOOGLE_CLIENT_ID}`;