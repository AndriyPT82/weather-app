import React from 'react';
import { Weekday } from '../Weekday';
import './Weekdays.scss';

export const Weekdays = ({ forecast }) => {


  return (
    <ul className="weekdays">
      {
        forecast.map((day, index) => (
          <React.Fragment>
            <Weekday
              index={index}
              {...day}
            />
          </React.Fragment>
        ))
      }
    </ul>
  )
}
