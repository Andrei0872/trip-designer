export interface SaveTripRequest {
    trip: {
        user_id: number;
        start_date: string;
        end_date: string;
    };

    activities: TripActivity[];

    todos: Todo[];
}

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