import { Diagnosis } from '@/types/diagnoses';
import apiClient from './index';


export async function get_diagnoses(
    plant_id: string,
    name: string,
    location?: string,
    sunlight?: string,
    ventilation?: string,
    soil_type?: string,
    temperature?: string,
    leaf_color?: string,
    stem_root_condition?: string,
    watering_frequency?: string,
    fertilizer_type?: string,
    fertilizing_frequency?: string,
    pesticide_history?: string,
    recent_weather?: string,
    image?: string
): Promise<Diagnosis> {
    const response = await apiClient.post(`/users/plants/${plant_id}/diagnoses`, {
        name,
        location, 
        sunlight, 
        ventilation, 
        soil_type, 
        temperature, 
        leaf_color,
        stem_root_condition,
        watering_frequency, 
        fertilizer_type,
        fertilizing_frequency,
        pesticide_history, 
        recent_weather,
        image
    });
    console.log(response.data);
    return response.data as Diagnosis;
}

export async function upload_image(image_url: string): Promise<string> {
    const formData = new FormData();
    formData.append('image', {
        uri: image_url,
        name: 'image.jpg',
        type: 'image/jpeg',
      }as any);
    const response = await apiClient.post(`users/plants/diagnoses/image`,formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const image_key = response.data["image_url"].key as string;

    if (image_key != null) {
        return `https://storage.googleapis.com/kotatsumuri-1/${image_key}` as string;
    } else {
        return '';
    }
}

