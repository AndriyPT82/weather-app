import React, { useContext } from 'react';

import { kelvinToCelsius } from '../../helpers.js'
import { IndexDayContext } from '../../App'
import classNames from 'classnames';


import './Weekday.scss';


export const Weekday = ({
  index,
  dt,
  temp,
  weather
}) => {

  const { indexDay, setIndexDay } = useContext(IndexDayContext)
  const currentDate = new Date(dt * 1000)

  return (
    <li className={classNames(
      'weekday',
      'card',
      { 'card--active': index === indexDay }
    )}
      onClick={() => setIndexDay(index)}
    >
      <h2 className="weekday__name">
        {currentDate.toLocaleDateString("en-US", { weekday: 'long' })}
      </h2>
      <div className="weekday__icon">
        <img
          src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
          alt="weather"
        />
      </div>
      <div className="weekday__temp">
        {kelvinToCelsius(temp.day)}
      </div>
    </li>
  )
}









// export const Card = ({ index, dayData = {} }) => {

//   const { indexDay, setIndexDay } = useContext(IndexDayContext)


//   const {
//     dt,
//     temp,
//     weather,
//   } = dayData;

//   const currentDate = new Date(dt * 1000)

//   return (
//     <li className={classNames(
//       'weekday',
//       'card',
//       { 'card--active': index === indexDay }
//     )}
//     onClick={() => setIndexDay(index)}
//     >
//       <h2 className="weekday__name">
//         {currentDate.toLocaleDateString("en-US", { weekday: 'long' })}
//       </h2>
//       <div className="weekday__icon">
//         <img
//           src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
//           alt="weather"
//         />
//       </div>
//       <div className="weekday__temp">
//         {kelvinToCelsius(temp.day)}
//       </div>
//     </li>
//   )
// }
