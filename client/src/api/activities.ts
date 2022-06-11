import { Activity, ActivityDTO } from "../types/activity";
import { CategoryDTO } from "../types/category";
import { axiosInstance } from "./axios";

export const fetchCategories = (): Promise<string[]> => {
  return axiosInstance.get('/activities-categories')
    .then(r => r.data)
    .then((r: CategoryDTO) => r.data);
}

export const fetchActivitiesByCategories = (categories?: string[]): Promise<Activity[]> => {
  let URL = `/activities`;
  if (!!categories) {
    URL += `?filter=${categories.join(',')}`;
  }

  return axiosInstance.get(URL)
    .then(r => r.data)
    .then((r: ActivityDTO) => r.data);
}