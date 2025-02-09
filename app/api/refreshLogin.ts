import { getAuth } from "firebase/auth";
import * as SecureStore from 'expo-secure-store';
// import { FIREBASE_API_KEY } from '@env';

const API_KEY = "AIzaSyB-farmmFzPzbsImqsIfOaoP0XM6doVDoI"; // Firebase の API Key

// refreshToken を使って新しい idToken を取得する関数
export default async function getIdTokenFromRefreshToken(refreshToken: string): Promise<string|null> {
  try {
    const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh idToken");
    }

    const data = await response.json();
    SecureStore.setItemAsync("idToken", data.id_token);
    SecureStore.setItemAsync("refreshToken", data.refresh_token);
    return data.id_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}
