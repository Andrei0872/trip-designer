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

export interface DayActivity {
  activityId: number;
  activityName: string;
  dayNumber: number;
  hours: string;
  note: string;
  // Because the same activity might be added to the same day or to different days, 
  // we need a way to distinguish the activities and we do that with help of the property below.
  dayActivityId: string;
};