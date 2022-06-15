import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserTrips } from "../api/trip";
import { useAxios } from "../context/useAxios";
import { useUserAuth } from "../context/userAuthContext";
import MainLayout from "../layout/MainLayout";
import { SummarizedTrip } from "../types/trip";
import "./MyTrips.scss";

const isTripExpired = (endDate: string) => (new Date()) > (new Date(endDate));

const TripList: React.FC<{ trips: SummarizedTrip[] }> = ({ trips }) => {
  const expiredTrips = useMemo(() => trips.filter(t => isTripExpired(t.end_date)), [trips.length]);
  const upcomingTrips = useMemo(() => trips.filter(t => !isTripExpired(t.end_date)), [trips.length]);
  
  const navigate = useNavigate();

  return (
    <div className="my-trips">
      <section className="my-trips__upcoming">
        <h2 className="my-trips__upcoming__title">Upcoming</h2>
        <ul className="my-trips__upcoming__trips">
        {
          upcomingTrips.map(
            t => 
              <li onClick={() => navigate(`/my-trips/${t.id}`)} key={t.id} className="my-trips__upcoming__trips__trip">
                <div className="my-trips__upcoming__trips__trip__country">{t.country}, {t.city}</div>
                <div className="my-trips__upcoming__trips__trip__days">{new Date(t.start_date).toLocaleDateString()} - {new Date(t.end_date).toLocaleDateString()}</div>
                
              </li>
          )
        }
      </ul>
      </section>

      <section className="my-trips__previous">
      <h2 className="my-trips__previous__title">Previous</h2>
      <ul className="my-trips__previous__trips" >
      {
        expiredTrips.map(
          t => 
            <li onClick={() => navigate(`/my-trips/${t.id}`)} key={t.id} className="my-trips__previous__trips__trip">
              <div className="my-trips__previous__trips__trip__country" >{t.country}, {t.city}</div>
              <div className="my-trips__previous__trips__trip__days" >{new Date(t.start_date).toLocaleDateString()} - {new Date(t.end_date).toLocaleDateString()}</div>
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
      <TripList trips={trips ? trips : []} />
      {/* {
        trips?.length
          ? <TripList trips={trips} />
          : <p>No trips yet.</p>
      } */}
    </MainLayout>
  )
}

export default MyTrips;