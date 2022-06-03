import './TripPlanner.scss'

import Activities from "../components/Activities"
import DailyPlanner from "../components/DailyPlanner"
import Details from "../components/Details"
import { ActivitiesProvider } from '../context/activities'
import MainLayout from '../layout/MainLayout'
import { useRef } from 'react'
import { ExportData } from '../types/utils'

function TripPlanner () {
  const detailsRef = useRef<ExportData>();
  const dailyPlannerRef = useRef<ExportData>();

  const collectPlannedTripData = () => {
    console.log(detailsRef.current?.exportData());
    console.log(dailyPlannerRef.current?.exportData());
  }

  return (
    <MainLayout>
      <section className="trip-planner">
        <div className="trip-planner__header">
          <button onClick={collectPlannedTripData} className="trip-planner__save">Sign up to save</button>
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