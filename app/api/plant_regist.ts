import apiClient from ".";


export async function plant_regist(plant_id: string): Promise<number> {
    const response = await apiClient.post('users/plants');
    apiClient.params = { plant_id };
    return response.status;
}