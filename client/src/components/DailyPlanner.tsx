import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragEventHandler, forwardRef, SyntheticEvent, useImperativeHandle, useMemo, useReducer, useState } from 'react';
import { useActivities } from '../context/activities';
import { ExportData } from '../types/utils';
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
type ActivityChangedPosition = { fromActivityId: string, toActivityId: string };
interface DayActivitiesProps {
  onActivityDropped: OnActivityDropped;
  onActivityUpdated: (a: DayActivity) => void;
  onActivityDeleted: (a: DayActivity) => void;
  onActivityPositionChanged: (position: ActivityChangedPosition) => void;
  activities: DayActivity[];
}
const DayActivities: React.FC<DayActivitiesProps> = (props) => {
  const {
    onActivityDropped,
    onActivityUpdated,
    onActivityDeleted,
    onActivityPositionChanged,
    activities,
  } = props;

  const [fromActivityId, setFromActivityId] = useState('');
  const [toActivityId, setToActivityId] = useState('');

  const onDrop: DragEventHandler<any> = ev => {
    const isRearrangingDayActivities = !!fromActivityId;
    if (!isRearrangingDayActivities) {
      onActivityDropped(ev);
    }
  } 

  const onPointerDown = (activityId: string) => {
    setFromActivityId(activityId);
  };

  const onPointerEnter = (activityId: string) => {
    setToActivityId(activityId);

  };

  const onPointerLeave = () => {
    setFromActivityId('');
    setToActivityId('');
  };

  const onPointerUp = (a: DayActivity) => {
    const hasActivityChangedPosition = !!fromActivityId && !!toActivityId && fromActivityId !== toActivityId;
    if (hasActivityChangedPosition) {
      onActivityPositionChanged({ fromActivityId, toActivityId });
    }
    
    setFromActivityId('');
    setToActivityId('');
  }

  return <ul
    onDragOver={e => e.preventDefault()}
    onDrop={onDrop}
    className='day-activities'
    data-is-empty={activities.length === 0}
  >
    {
      activities.length
        ? activities.map(
          (a, i) => 
            <li
              onDragEnd={() => onPointerUp(a)}
              onPointerLeave={() => onPointerLeave()}
              onDragEnter={() => onPointerEnter(a.dayActivityId)}
              onDragStart={() => onPointerDown(a.dayActivityId)}
              draggable='true'
              data-index={i + 1}
              key={a.activityId + ':' + a.dayNumber + ':' + i}
              className='day-activities__activity'
              data-has-pointer-entered={toActivityId === a.dayActivityId && fromActivityId !== a.dayActivityId}
            >
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
  activityId: number;
  activityName: string;
  dayNumber: number;
  hours: string;
  note: string;
  // Because the same activity might be added to the same day or to different days, 
  // we need a way to distinguish the activities and we do that with help of the property below.
  dayActivityId: string;
};

type DayActivitiesState = DayActivity[];

type DayActivitiesAction =
  | { type: 'add' } & DayActivity
  | { type: 'remove' } & DayActivity
  | { type: 'update' } & DayActivity
  | { type: 'rearrange' } & ActivityChangedPosition;

const isTheSameActivity = (a: DayActivity, aTest: DayActivity) => a.dayActivityId === aTest.dayActivityId;

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

    case 'rearrange': {
      const { type, fromActivityId, toActivityId } = action;

      const newState = [...state];

      const fromActivityIdx = newState.findIndex(a => a.dayActivityId === fromActivityId);
      const toActivityIdx = newState.findIndex(a => a.dayActivityId === toActivityId);

      const movedItem = newState[fromActivityIdx];
      newState.splice(fromActivityIdx, 1);
      newState.splice(toActivityIdx, 0, movedItem);

      return newState;
    }

    default: {
      throw new Error('Unknown action!');
    }
  }
};

const dayActivityCreateDefault = (options?: Partial<DayActivity>): DayActivity => ({
  activityId: -1,
  activityName: '',
  hours: '',
  note: '',
  dayNumber: 0,
  dayActivityId: Math.random().toString(36).slice(2, 7),
  ...options,
});

function DailyPlanner (props: any, ref: any) {
  const [dailyActivities, dispatchDailyActivitiesAction] = useReducer(dailyActivitiesReducer, []);
  
  const [selectedDayNumber, setSelectedDayNumber] = useState(0);

  const { activities } = useActivities();

  useImperativeHandle<ExportData, ExportData>(ref, () => ({
    exportData: () => ({ dailyActivities }),
  }));

  const crtDayActivities = dailyActivities.filter(a => a.dayNumber === selectedDayNumber);

  // TODO: maybe `useCallback` to memoize `DayActivities`.
  const onActivityDropped: DragEventHandler = (ev) => {
    if (!activities) {
      return null;
    }

    const activityId = ev.dataTransfer.getData('text');
    // TODO: adapt for Backend when the time comes.
    const activity = activities.find(a => +a.id === +activityId);

    dispatchDailyActivitiesAction({
      type: 'add',
      ...dayActivityCreateDefault({
        activityName: activity?.name,
        activityId: activity?.id,
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

  const onActivityPositionChanged = (position: { fromActivityId: string, toActivityId: string }) => {
    dispatchDailyActivitiesAction({
      type: 'rearrange',
      ...position,
    });
  }

  return (
    <div className="daily-planner">
      <Days onSelectedDayNumber={setSelectedDayNumber} nrDays={10} />

      <DayActivities
        onActivityPositionChanged={onActivityPositionChanged}
        activities={crtDayActivities}
        onActivityUpdated={onDayActivityUpdated}
        onActivityDropped={onActivityDropped}
        onActivityDeleted={onDayActivityDeleted}
      />
    </div>
  )
}

export default forwardRef(DailyPlanner);