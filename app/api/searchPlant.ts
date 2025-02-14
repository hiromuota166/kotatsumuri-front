import apiClient from ".";
import { plant } from "../../types/plant"; 

export async function searchPlant(query: string): Promise<plant> {
    const response = await apiClient.get(`/plants?query=${encodeURIComponent(query)}`);
    console.log(response.data["plant"] as plant);
    return response.data["plant"] as plant;
}

export async function getPlant(plant_id: string): Promise<plant> {
    const response = await apiClient.get(`/users/plants/${plant_id}`);
    return response.data["plant"] as plant;
}