import apiClient from ".";


export async function plant_regist(plant_id: number): Promise<number> {
    const response = await apiClient.post('users/plants', { plant_id });
    return response.status;
}