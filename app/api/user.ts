import apiClient from '../api';


export async function updateUser(name: string): Promise<void> {
    const response = await apiClient.patch('/users/me', { name });
    return response.data;
}