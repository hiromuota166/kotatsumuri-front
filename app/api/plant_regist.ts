import { RegisteredPlant } from "@/types/plant";
import apiClient from ".";


export async function post_plant_regist(plant_id: string): Promise<number> {
    const response = await apiClient.post('users/plants', {plant_id});
    return response.status;
}

export async function get_plant_regist(): Promise<[RegisteredPlant]> {
    const response = await apiClient.get('users/plants');
    console.log(response.data["plants"] as [RegisteredPlant][0]);
    return response.data["plants"] as [RegisteredPlant];
}