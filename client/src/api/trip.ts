import { ACCESS_TOKEN_HEADER } from "../context/useAxios";
import { InspectedTrip, RawTripData, SaveTripRequest, SummarizedTrip } from "../types/trip";
import { User } from "../types/user";
import { axiosInstance } from "./axios";

export const saveTrip = (rawData: RawTripData, barelyCreatedUser?: User) => {
    const body: SaveTripRequest = {
        activities: rawData.dailyActivities.map(
            a => ({
                // TODO: if you have the time(which I doubt), use the data from the user for the `hours` field.
                activity_id: a.activityId, day_number: a.dayNumber + 1, hours: `10:30-12:30`, note: a.note
            })
        ),
        todos: rawData.otherDetails.todos.map(t => ({ checked: t.isCompleted, description: t.text })),
        trip: {
            user_id: rawData.userId,
            start_date: rawData.otherDetails.start_date,
            end_date: rawData.otherDetails.end_date,
        }
    };

    const headers = {
        'Content-Type': 'application/json'
    };

    const shouldManuallyAddToken = !!barelyCreatedUser;
    if (shouldManuallyAddToken) {
        headers[ACCESS_TOKEN_HEADER] = barelyCreatedUser.token;
    }

    return axiosInstance.post('/save-trip', JSON.stringify(body), { headers })
        .then(r => r.data);
}

export const fetchUserTrips = (userId: number): Promise<SummarizedTrip[]> => {
    const params = new URLSearchParams([['userId', userId.toString()]]);

    return axiosInstance.get('/trips', { params })
        .then(r => r.data.trips);
};

export const fetchTripWithID = (tripId: number): Promise<InspectedTrip> => {
    return axiosInstance.get(`/trips/${tripId}`)
        .then(r => r.data)
}