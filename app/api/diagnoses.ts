import apiClient from './index';


export async function diagnoses(
    plant_id: string,
    name: string,
    location: string,
    sunlight: string,
    ventilation: string,
    soil_type: string,
    temperature: string,
    humidity: string,
    leaf_color: string,
    stem_root_condition: string,
    other_parts_condition: string,
    watering_frequency: string,
    fertilizer_type: string,
    fertilizing_frequency: string,
    pesticide_history: string,
    recent_weather: string,
    image: string
): Promise<any> {
    const response = await apiClient.post(`/users/plants/${plant_id}/diagnoses`, {
        name,
        location, 
        sunlight, 
        ventilation, 
        soil_type, 
        temperature, 
        humidity, 
        leaf_color,
        stem_root_condition,
        other_parts_condition,
        watering_frequency, 
        fertilizer_type,
        fertilizing_frequency,
        pesticide_history, 
        recent_weather,
        image
    });
    return response.data;
}

