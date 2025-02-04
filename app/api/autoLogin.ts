import axios from "axios";
import * as SecureStore from "expo-secure-store";

const loginClient = axios.create({
    baseURL: "http://localhost:3000",
});

export async function autoLogin(): Promise<boolean> {
    const idToken = await SecureStore.getItemAsync('idToken');
    loginClient.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
    const response = await loginClient.get('users/login');
    if (response.status == 200) {
        return true;
    } else {
        return false;
    }
}