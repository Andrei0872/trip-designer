import { DragEventHandler, SyntheticEvent, useMemo, useReducer, useState } from 'react';
import { useActivities } from '../context/activities';
import './DailyPlanner.scss'

type OnSelectedDayNumber = (d: number) => void;
const Days: React.FC<{ nrDays: number, onSelectedDayNumber: OnSelectedDayNumber }> = (props) => {
  const { nrDays, onSelectedDayNumber } = props;

  const [selectedDayNumber, setSelectedDayNumber] = useState(0);

  const selectDay = (dayNumber: number) => {
    setSelectedDayNumber(dayNumber);
    onSelectedDayNumber(dayNumber);
  }

  return (
    <div className="days-wrapper">
      <ul className="days">
        {
          Array.from({ length: nrDays })
            .map(
              (_, i) =>
              <li
                className={`days__day ${i === selectedDayNumber ? 'days__day--selected' : ''}`}
                onClick={() => selectDay(i)}
                key={i}
              >
                <span>Day {i + 1}</span>
              </li>
            )
        }
      </ul>
    </div>
  )
}

type OnActivityDropped = DragEventHandler<any>;
const DayActivities: React.FC<{ onActivityDropped: OnActivityDropped, activities: DayActivity[] }> = (props) => {
  const { onActivityDropped, activities } = props;

  return <div
    onDragOver={e => e.preventDefault()}
    onDrop={onActivityDropped}
    className='day-activities'
  >
    {
      activities.length
        ? JSON.stringify(activities)
        : 'No activities for this day!'
    }
  </div>;
}

const DayActivity = () => {};

interface DayActivity {
  // tripId: number;
  // FIXME(BE): use `number` instead of `string`.
  activityId: string;
  activityName: string;
  dayNumber: number;
  hours: string;
  note: string;
};

type DayActivitiesState = DayActivity[];

type DayActivitiesAction =
  | { type: 'add' } & DayActivity
  | { type: 'remove' }
  | { type: 'update' };

const dailyActivitiesReducer = (state: DayActivitiesState, action: DayActivitiesAction): DayActivitiesState => {
  const { type } = action;
  
  switch (type) {
    case 'add': {
      const { type, ...payload } = action;

      return [
        ...state,
        payload,
      ]
    }

    default: {
      throw new Error('Unknown action!');
    }
  }
};

const dayActivityCreateDefault = (options?: Partial<DayActivity>): DayActivity => ({
  // FIXME(BE): use `number` instead of `string`.
  activityId: '',
  activityName: '',
  hours: '',
  note: '',
  dayNumber: 0,
  ...options,
});

function DailyPlanner () {
  const [dailyActivities, dispatchDailyActivitiesAction] = useReducer(dailyActivitiesReducer, []);
  
  const [selectedDayNumber, setSelectedDayNumber] = useState(0);

  const { activities } = useActivities();

  // TODO: maybe `useCallback` to memoize `DayActivities`.
  const onActivityDropped: DragEventHandler = (ev) => {
    if (!activities) {
      return null;
    }

    const activityId = ev.dataTransfer.getData('text');
    // TODO: adapt for Backend when the time comes.
    const activity = activities.find(a => activityId);

    dispatchDailyActivitiesAction({
      type: 'add',
      ...dayActivityCreateDefault({
        activityName: activity,
        activityId: activity,
        dayNumber: selectedDayNumber,
      }),
    });
  }

  const crtDayActivities = dailyActivities.filter(a => a.dayNumber === selectedDayNumber);
  
  console.log('render');

  return (
    <div className="daily-planner">
      <Days onSelectedDayNumber={setSelectedDayNumber} nrDays={10} />

      <DayActivities activities={crtDayActivities} onActivityDropped={onActivityDropped} />
    </div>
  )
}

export default DailyPlanner