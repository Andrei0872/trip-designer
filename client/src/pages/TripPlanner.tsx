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

  return (
    <MainLayout>
      <section className="trip-planner">
        <div className="trip-planner__header">
          <button className="trip-planner__save">Sign up to save</button>
        </div>

        <div className="trip-planner__body">
          <Details ref={detailsRef} />
          <ActivitiesProvider>
            <DailyPlanner />
            <Activities />
          </ActivitiesProvider>
        </div>
      </section>
    </MainLayout>
    
  )
}

export default TripPlanner