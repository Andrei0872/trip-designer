import { Activity, ActivityDTO } from "../types/activity";
import { CategoryDTO } from "../types/category";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchCategories = (): Promise<string[]> => {
  const URL = `${API_URL}/activities-categories`
  return fetch(URL).then(r => r.json()).then((r: CategoryDTO) => r.data);
}

export const fetchActivitiesByCategories = (categories?: string[]): Promise<Activity[]> => {
  let URL = `${API_URL}/activities`;
  if (!!categories) {
    URL += `?filter=${categories.join(',')}`;
  }

  return fetch(URL).then(r => r.json()).then((r: ActivityDTO) => r.data);
}