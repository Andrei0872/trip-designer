export interface Activity {
  id: number;
  name: string;
  description: string;
  country: string;
  city: string;
  category: string[];
}

export interface ActivityDTO {
  message: string;
  data: Activity[];
}