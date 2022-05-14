import './TripPlanner.scss'

import Activities from "../components/Activities"
import DailyPlanner from "../components/DailyPlanner"
import Details from "../components/Details"
import { ActivitiesProvider } from '../context/activities'

function TripPlanner () {
  return (
    <section className="trip-planner">
      <div className="trip-planner__header">
        <button className="trip-planner__save">Sign up to save</button>
      </div>

      <div className="trip-planner__body">
        <Details />
        <ActivitiesProvider>
          <DailyPlanner />
          <Activities />
        </ActivitiesProvider>
      </div>
    </section>
  )
}

export default TripPlanner