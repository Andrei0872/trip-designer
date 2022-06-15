import './Days.scss'

import { useState } from "react";

export type OnSelectedDayNumber = (d: number) => void;
export const Days: React.FC<{ nrDays: number, onSelectedDayNumber: OnSelectedDayNumber }> = (props) => {
  const { nrDays, onSelectedDayNumber } = props;

  const [selectedDayNumber, setSelectedDayNumber] = useState(0);

  const selectDay = (dayNumber: number) => {
    setSelectedDayNumber(dayNumber);
    onSelectedDayNumber(dayNumber);
  }

  return (
    <div className="days-wrapper">
      {
        nrDays > 0
          ? <ul className="days">
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
          : <p className='no-days'>Please select the start date and end date.</p>
      }
    </div>
  )
}