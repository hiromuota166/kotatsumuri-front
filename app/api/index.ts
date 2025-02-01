import React from "react";
import axios from "axios";
import { getAuth, getIdToken } from "firebase/auth";


const apiClient = axios.create({
    baseURL: "http://localhost:3000",
});

apiClient.interceptors.request.use(
    async (config) => {
        const auth = getAuth();
        const user = await auth.currentUser;
        if (!user) {
            throw new Error("User is not signed in");
        }
        const idToken = await getIdToken(user);
        config.headers.Authorization = `Bearer ${idToken}`
        console.log(config.headers);
        return config;
    },
  (error) => {
    return Promise.reject(error);
  }
)

export default apiClient;