import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTripWithID } from "../api/trip";
import DailyPlanner from "../components/DailyPlanner"
import { DayActivities } from "../components/DayActivities";
import { Days } from "../components/Days";
import Details, { DetailsProps } from "../components/Details"
import { useAxios } from "../context/useAxios"
import MainLayout from "../layout/MainLayout"
import { computeNrDays } from "../utils";

function IndividualTrip () {
    useAxios();

    const { id } = useParams();

    const [todos, setTodos] = useState([]);
    const [activities, setActivities] = useState([]);

    const navigate = useNavigate();

    const [selectedDayNumber, setSelectedDayNumber] = useState(1);

    useEffect(() => {
        fetchTripWithID(+id)
            .then(({ tripActivities, tripTodos }) => {
                setTodos(tripTodos);
                setActivities(tripActivities);
            })
            .catch(() => navigate('/my-trips'));
    }, []);

    const detailsData: DetailsProps['readonlyData'] = useMemo(() => ({
        todos: todos.map(t => ({ isCompleted: t.checked, text: t.description })) as any,
        endDate: activities[0]?.end_date,
        startDate: activities[0]?.start_date,
    }), [activities.length]);

    const nrDays = computeNrDays(detailsData.startDate, detailsData.endDate);
    
    const crtDayActivities = activities.filter(a => a.day_number === selectedDayNumber);

    return (
    <MainLayout>
        <section className="trip">
            {
                activities.length ? <Details readonlyData={detailsData} /> : null
            }

            <div className="trip-day-activities">
                <Days onSelectedDayNumber={d => setSelectedDayNumber(d + 1)} nrDays={nrDays} />

                <DayActivities
                    // Quick hack done at 00:51, 16 Jun 2022.
                    onActivityPositionChanged={() => {}}
                    activities={crtDayActivities.map(a => ({ ...a, activityName: a.name }))}
                    onActivityUpdated={() => {}}
                    onActivityDropped={() => {}}
                    onActivityDeleted={() => {}}
                    isReadonly={true}
                />
            </div>
        </section>
    </MainLayout>
)
}

export default IndividualTrip