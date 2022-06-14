import { DayActivity } from "./activity";

export interface TripActivity {
    activity_id: number;
    day_number: number;
    hours: string;
    note: string;
}

export interface Todo {
    checked: boolean;
    description: string;
}

export interface RawTodo {
    isCompleted: boolean;
    text: string;
}

export interface SaveTripRequest {
    trip: {
        user_id: number;
        start_date: string;
        end_date: string;
    };

    activities: TripActivity[];

    todos: Todo[];
}

export interface RawTripData {
    otherDetails: {
        start_date: string;
        end_date: string;
        todos: RawTodo[];
    }
    dailyActivities: DayActivity[];
    userId: number;
}

export interface SummarizedTrip {
    accommodation_link: string;
    country: string;
    city: string;
    end_date: string;
    id: number;
    start_date: string;
    transport_link: string;
}