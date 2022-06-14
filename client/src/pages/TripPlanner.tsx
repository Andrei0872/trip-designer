import './TripPlanner.scss'

import Activities from "../components/Activities"
import DailyPlanner from "../components/DailyPlanner"
import Details from "../components/Details"
import { ActivitiesProvider } from '../context/activities'
import MainLayout from '../layout/MainLayout'
import { useRef } from 'react'
import { ExportData } from '../types/utils'
import { saveTrip } from '../api/trip'
import { useUserAuth } from '../context/userAuthContext'
import { DayActivity } from '../types/activity'
import { RawTripData } from '../types/trip'

function TripPlanner () {
  const detailsRef = useRef<ExportData<{ otherDetails: RawTripData['otherDetails'] }>>();
  const dailyPlannerRef = useRef<ExportData<{ dailyActivities: DayActivity[] }>>();

  const { user } = useUserAuth();

  const sendPlannedTripData = () => {
    console.log(detailsRef.current?.exportData());
    console.log(dailyPlannerRef.current?.exportData());
    saveTrip({
      userId: user.id,
      dailyActivities: dailyPlannerRef.current?.exportData().dailyActivities,
      otherDetails: detailsRef.current?.exportData().otherDetails
    });
  }

  return (
    <MainLayout>
      <section className="trip-planner">
        <div className="trip-planner__header">
          <button onClick={sendPlannedTripData} className="trip-planner__save">Save trip</button>
        </div>

        <div className="trip-planner__body">
          <Details ref={detailsRef} />
          <ActivitiesProvider>
            <DailyPlanner ref={dailyPlannerRef} />
            <Activities />
          </ActivitiesProvider>
        </div>
      </section>
    </MainLayout>
    
  )
}

export default TripPlanner