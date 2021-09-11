import React, { useEffect, useState } from 'react';

import { getLocalForecast } from './api/weatherApiService';
import { CurrentDay } from './components/CurrentDay';
import { Weekdays } from './components/Weekdays';
import { Input } from './components/Input';
import './App.scss';

export const IndexDayContext = React.createContext()

function App() {

  const [coords, setCoords] = useState([]);
  const [dataFromApi, setDataFromApi] = useState([]);
  const [indexDay, setIndexDay] = useState(0)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCoords([latitude, longitude])
    })
  }, [])

  const handleFetch = (request) => {
    const { cityName, forecast } = request;
    const today = forecast.daily[0];
    const weekWeather = forecast.daily.slice(0, 7)
    today.cityName = cityName;

    setDataFromApi([today, weekWeather])

  }

  useEffect(() => {
    if (!coords.length) {
      return;
    }
    const [latitude, longitude] = coords;
    getLocalForecast([latitude, longitude])
      .then(handleFetch)
  }, [coords])

  const [today, weekWeather] = dataFromApi;

  return (
    <div className="App">
      <Input setCoords={setCoords} />

      {
        !dataFromApi.length
          ? <div className="message">
            <span>Allow geolocation to continue or choose city</span>
          </div>
          : <>
            <CurrentDay
              cityName={today.cityName}
              {...weekWeather[indexDay]}
            />
            <IndexDayContext.Provider value={{ setIndexDay, indexDay }}>
              <Weekdays forecast={weekWeather} />
            </IndexDayContext.Provider>
          </>
      }
    </div>
  );
}

export default App;
