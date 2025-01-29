import apiClient from ".";
import { plant } from "../../types/plant"; 

export async function searchPlant(query: string): Promise<plant> {
    const response = await apiClient.get(`/plants?query=${encodeURIComponent(query)}`);
    console.log(response.data);
    return response.data;
}