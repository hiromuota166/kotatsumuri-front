import React from "react";
import axios from "axios";
import { getAuth, getIdToken } from "firebase/auth";
import * as SecureStore from 'expo-secure-store';
import getIdTokenFromRefreshToken from "./refreshLogin";


const apiClient = axios.create({
    baseURL: "http://localhost:8080",
});

apiClient.interceptors.request.use(
    async (config) => {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (!refreshToken) {
            return config;
        }
        const idToken = await getIdTokenFromRefreshToken(refreshToken);
        config.headers.Authorization = `Bearer ${idToken}`
        console.log(config.headers);
        return config;
    },
  (error) => {
    return Promise.reject(error);
  }
)

export default apiClient;