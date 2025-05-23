import axios from "axios";
import * as SecureStore from "expo-secure-store";
import getIdTokenFromRefreshToken from "./refreshLogin";

const loginClient = axios.create({
    baseURL: "http://localhost:8080",
});

export async function autoLogin(): Promise<boolean> {
    const idToken = await SecureStore.getItemAsync('idToken');
    loginClient.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
    const response = await loginClient.get('users/login');
    if (response.status == 200) {
        return true;
    } else if (response.status == 401) {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (!refreshToken) {
            return false;
        }
        const newIdToken = await getIdTokenFromRefreshToken(refreshToken);

        if (newIdToken) {
            loginClient.defaults.headers.common['Authorization'] = `Bearer ${newIdToken}`;
            const response = await loginClient.get('users/login');

            if (response.status === 200) {
            return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    } else {

        return false;
        
    }
}