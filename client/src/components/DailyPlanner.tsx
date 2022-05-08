import { SyntheticEvent } from 'react';
import './DailyPlanner.scss'

const Days: React.FC<{ nrDays: number }> = (props) => {
  const { nrDays } = props;
  
  return (
    <div className="days-wrapper">
      <ul className="days">
        {
          Array.from({ length: nrDays })
            .map(
              (_, i) => <li className="days__day" key={i}><span>Day {i + 1}</span></li>
            )
        }
      </ul>
    </div>
  )
}

const DayActivities: React.FC<{ activities: string[] }> = (props) => {
  const { activities } = props;

  const onActivityDropped = (ev: SyntheticEvent) => {
    console.log(ev);
  }

  return <div
    onDragOver={e => e.preventDefault()}
    onDrop={onActivityDropped}
    className='day-activities'
  >
    Some activities
  </div>;
}

function DailyPlanner () {
  return (
    <div className="daily-planner">
      <Days nrDays={10} />

      <DayActivities activities={[]} />
    </div>
  )
}

export default DailyPlanner