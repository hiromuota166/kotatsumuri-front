import apiClient from ".";

export type CarePeriod = {
  plant_id: number;
  plant_name: string;
  id: number;
  start_date: Date;
  end_date: Date;
  period_type: string;
};

export async function carePeriods(): Promise<CarePeriod[]> {
  const response = await apiClient.get('/users/plants/care_info');
  return response.data;
}