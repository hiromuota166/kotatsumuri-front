import apiClient from './index';


export async function diagnoses(plant_id: string): Promise<any> {
    const response = await apiClient.post(`/users/plants/${plant_id}/diagnoses`);
    return response.data;
}

