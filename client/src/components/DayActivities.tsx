import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DragEventHandler, useState } from "react";
import { DayActivity } from "../types/activity";

import './DayActivities.scss';

export type OnActivityDropped = DragEventHandler<any>;
export type ActivityChangedPosition = { fromActivityId: string, toActivityId: string };
export interface DayActivitiesProps {
  onActivityDropped: OnActivityDropped;
  onActivityUpdated: (a: DayActivity) => void;
  onActivityDeleted: (a: DayActivity) => void;
  onActivityPositionChanged: (position: ActivityChangedPosition) => void;
  activities: DayActivity[];
  isReadonly?: boolean;
}
export const DayActivities: React.FC<DayActivitiesProps> = (props) => {
  const {
    onActivityDropped,
    onActivityUpdated,
    onActivityDeleted,
    onActivityPositionChanged,
    activities,
    isReadonly = false
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
              {
                ...isReadonly
                  ? undefined
                  : {
                    onDragEnd:() => onPointerUp(a),
                    onPointerLeave:() => onPointerLeave(),
                    onDragEnter:() => onPointerEnter(a.dayActivityId),
                    onDragStart:() => onPointerDown(a.dayActivityId),
                  }
              }
              draggable='true'
              data-index={i + 1}
              key={a.activityId + ':' + a.dayNumber + ':' + i}
              className='day-activities__activity'
              data-has-pointer-entered={toActivityId === a.dayActivityId && fromActivityId !== a.dayActivityId}
            >
              <div className='day-activities__hours'><input readOnly={isReadonly} size={5} maxLength={5} type="text" placeholder='HH:mm' value={a.hours} onChange={(ev) => onActivityUpdated({ ...a, hours: ev.target.value })} /></div>
              <div className='day-activities__activityName'>{a.activityName}</div>
              <textarea readOnly={isReadonly} rows={3} className='day-activities__note' value={a.note} onChange={(ev) => onActivityUpdated({ ...a, note: ev.target.value })} placeholder='Add a note'></textarea>
              <div className="day-activities__actions">
                {
                  isReadonly
                    ? null
                    : <button onClick={() => onActivityDeleted(a)} className='day-activities__action day-activities__action--delete'>
                      <FontAwesomeIcon fontSize={'.9rem'} icon={faTrashCan} />
                    </button>
                }
              </div>
            </li>
        )
        : <p className='noactivities'>No activities for this day!</p>
    }
  </ul>;
}