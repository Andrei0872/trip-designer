import { Activity } from "../types/activity";

const API_URL = process.env.REACT_APP_API_URL;

const wrapPromise = <T>(data: T, time = 500): Promise<T> => new Promise(res => setTimeout(res, time, data));

const categories = ['cultural', 'sport', 'experience', 'entertainment', 'outdoor', 'indoor'];
export const fetchCategories = (): Promise<string[]> => {
  return wrapPromise(categories)!;
}

const activitiesByCategory = {
  'cultural': ['cultural.a1', 'cultural.a2'],
  'sport': ['sport.a1', 'sport.a2', 'sport.a3'],
  'experience': ['experience.a1', 'experience.a2'],
  'indoor': ['indoor.a1', 'indoor.a2'],
  'outdoor': ['outdoor.a1', 'outdoor.a2'],
  'entertainment': ['entertainment.a1', 'entertainment.a2'],
};
export const fetchActivitiesByCategories = (categories: string[]): Promise<string[]> => {
  // @ts-ignore
  const activities = categories.reduce((acc, crt) => [...acc, ...activitiesByCategory[crt]], []) as string[];

  return wrapPromise(activities);
}