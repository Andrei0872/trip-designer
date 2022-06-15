import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragEventHandler, forwardRef, SyntheticEvent, useEffect, useImperativeHandle, useMemo, useReducer, useState } from 'react';
import { useActivities } from '../context/activities';
import { DayActivity } from '../types/activity';
import { ExportData } from '../types/utils';
import './DailyPlanner.scss'
import { ActivityChangedPosition, DayActivities } from './DayActivities';
import { Days } from './Days';



type DayActivitiesState = DayActivity[];

type DayActivitiesAction =
  | { type: 'add' } & DayActivity
  | { type: 'remove' } & DayActivity
  | { type: 'update' } & DayActivity
  | { type: 'rearrange' } & ActivityChangedPosition
  | { type: 'replace' } & { dayActivities: DayActivity[] };

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

    case 'replace': {
      return [...action.dayActivities];
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

  useEffect(() => {
    if (props.nrDays > dailyActivities.length) {
      return;
    }

    dispatchDailyActivitiesAction({
      type: 'replace',
      dayActivities: dailyActivities.filter(a => a.dayNumber < props.nrDays),
    });

  }, [props.nrDays]);

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
      <Days onSelectedDayNumber={setSelectedDayNumber} nrDays={props.nrDays} />

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