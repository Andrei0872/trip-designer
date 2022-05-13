import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
interface DayActivitiesProps {
  onActivityDropped: OnActivityDropped;
  onActivityUpdated: (a: DayActivity) => void;
  onActivityDeleted: (a: DayActivity) => void;
  activities: DayActivity[];
}
const DayActivities: React.FC<DayActivitiesProps> = (props) => {
  const { onActivityDropped, onActivityUpdated, onActivityDeleted, activities } = props;

  return <ul
    onDragOver={e => e.preventDefault()}
    onDrop={onActivityDropped}
    className='day-activities'
  >
    {
      activities.length
        ? activities.map(
          (a, i) => 
            <li data-index={i} key={a.activityId + ':' + a.dayNumber + ':' + i} className='day-activities__activity'>
              <div className='day-activities__hours'><input size={5} maxLength={5} type="text" placeholder='HH:mm' value={a.hours} onChange={(ev) => onActivityUpdated({ ...a, hours: ev.target.value })} /></div>
              <div>{a.activityName}</div>
              <textarea rows={3} className='day-activities__note' value={a.note} onChange={(ev) => onActivityUpdated({ ...a, note: ev.target.value })} placeholder='Add a note'></textarea>
              <div className="day-activities__actions">
                <button onClick={() => onActivityDeleted(a)} className='day-activities__action day-activities__action--delete'>
                  <FontAwesomeIcon fontSize={'.9rem'} icon={faTrashCan} />
                </button>
              </div>
            </li>
        )
        : 'No activities for this day!'
    }
  </ul>;
}

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
  | { type: 'remove' } & DayActivity
  | { type: 'update' } & DayActivity;

const isTheSameActivity = (a: DayActivity, aTest: DayActivity) => a.activityId === aTest.activityId && a.dayNumber === aTest.dayNumber;

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

    case 'update': {
      const { type, ...payload } = action;

      return state.map(a => isTheSameActivity(a, payload) ? payload : a);
    }

    case 'remove': {
      const { type, ...payload } = action;

      return state.filter(a => !isTheSameActivity(a, payload));
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

  const crtDayActivities = dailyActivities.filter(a => a.dayNumber === selectedDayNumber);

  // TODO: maybe `useCallback` to memoize `DayActivities`.
  const onActivityDropped: DragEventHandler = (ev) => {
    if (!activities) {
      return null;
    }

    const activityId = ev.dataTransfer.getData('text');
    // TODO: adapt for Backend when the time comes.
    const activity = activities.find(a => a === activityId);

    dispatchDailyActivitiesAction({
      type: 'add',
      ...dayActivityCreateDefault({
        activityName: activity,
        activityId: activity,
        dayNumber: selectedDayNumber,
      }),
    });
  }

  const onDayActivityUpdated = (a: DayActivity) => {
    dispatchDailyActivitiesAction({
      type: 'update',
      ...a
    });
  }

  const onDayActivityDeleted = (a: DayActivity) => {
    dispatchDailyActivitiesAction({
      type: 'remove',
      ...a
    });
  }

  console.log('render');

  return (
    <div className="daily-planner">
      <Days onSelectedDayNumber={setSelectedDayNumber} nrDays={10} />

      <DayActivities
        activities={crtDayActivities}
        onActivityUpdated={onDayActivityUpdated}
        onActivityDropped={onActivityDropped}
        onActivityDeleted={onDayActivityDeleted}
      />
    </div>
  )
}

export default DailyPlanner