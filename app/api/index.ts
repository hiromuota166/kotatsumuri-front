import React from "react";
import axios from "axios";
import { getAuth, getIdToken } from "firebase/auth";
import * as SecureStore from 'expo-secure-store';


const apiClient = axios.create({
    baseURL: "http://localhost:3000",
});

apiClient.interceptors.request.use(
    async (config) => {
        const auth = getAuth();
        const idToken = await SecureStore.getItemAsync('idToken');
        config.headers.Authorization = `Bearer ${idToken}`
        console.log(config.headers);
        return config;
    },
  (error) => {
    return Promise.reject(error);
  }
)

export default apiClient;