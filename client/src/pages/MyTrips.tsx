import { useEffect, useMemo, useState } from "react";
import { fetchUserTrips } from "../api/trip";
import { useAxios } from "../context/useAxios";
import { useUserAuth } from "../context/userAuthContext";
import MainLayout from "../layout/MainLayout";
import { SummarizedTrip } from "../types/trip";

const isTripExpired = (endDate: string) => (new Date()) > (new Date(endDate));

const TripList: React.FC<{ trips: SummarizedTrip[] }> = ({ trips }) => {
  const expiredTrips = useMemo(() => trips.filter(t => isTripExpired(t.end_date)), []);
  const upcomingTrips = useMemo(() => trips.filter(t => !isTripExpired(t.end_date)), []);
  
  return (
    <div className="my-trips">
      <section>
        <h2>Upcoming</h2>
        <ul>
        {
          upcomingTrips.map(
            t => 
              <li key={t.id}>
                <div>{t.country}</div>
                <div>{t.start_date} - {t.end_date}</div>
              </li>
          )
        }
      </ul>
      </section>

      <section>
      <h2>Previous</h2>
      <ul>
      {
        expiredTrips.map(
          t => 
            <li key={t.id}>
              <div>{t.country}</div>
              <div>{t.start_date} - {t.end_date}</div>
            </li>
        )
      }
    </ul>
    </section>
    </div>
  )
}

function MyTrips() {
  const [trips, setTrips] = useState<null | SummarizedTrip[]>(null);

  const { user } = useUserAuth();

  useAxios();

  useEffect(() => {
    fetchUserTrips(user.id)
      .then(setTrips);
  }, []);

  return (
    <MainLayout>
      {
        trips?.length
          ? <TripList trips={trips} />
          : <p>No trips yet.</p>
      }
    </MainLayout>
  )
}

export default MyTrips;