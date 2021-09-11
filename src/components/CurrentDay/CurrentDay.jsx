import React from 'react';
import { kelvinToCelsius } from '../../helpers.js'
import './CurrentDay.scss'


export const CurrentDay = ({
  cityName,
  dt,
  humidity,
  temp,
  weather,
  wind_speed,
}) => {


  const currentDate = new Date(dt * 1000)

  return (
    <div className="current-day">

      <div className="current-day__main-info card">
        <h2>
          {currentDate.toLocaleDateString("en-US", { weekday: 'long' })}
        </h2>
        <div className="current-day__icon ">
          <img
            src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
            alt="weather"
          />
          <div className="current-day__img-description">
            {weather[0].description}
          </div>
        </div>
        <div className="current-day__temp">
          {kelvinToCelsius(temp.day)}
        </div>
      </div>

      <div className="current-day__city-name">
        <h1>{cityName}</h1>
      </div>

      <div className="current-day__details">
        <span>
          <span>Date:</span> <span>{currentDate.toLocaleDateString("uk-UA")}</span>

        </span>
        <span>
          <span>Wind Speed:</span> <span>{`${wind_speed} m/s`} </span>

        </span>
        <span>
          <span>Humidity:</span> <span>{humidity}</span>
        </span>
      </div>
    </div>
  )
}
