import './TripPlanner.scss'

import Activities from "../components/Activities"
import DailyPlanner from "../components/DailyPlanner"
import Details from "../components/Details"

function TripPlanner () {
  return (
    <section className="trip-planner">
      <div className="trip-planner__header">
        <button className="trip-planner__save">Sign up to save</button>
      </div>

      <div className="trip-planner__body">
        <Details />
        <DailyPlanner />
        <Activities />
      </div>
    </section>
  )
}

export default TripPlanner