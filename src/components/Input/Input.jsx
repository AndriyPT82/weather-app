import React, { useState, useEffect, useCallback } from 'react';
import './Input.scss';


const debounce = (func, delay) => {
  let timer;

  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(func, delay, ...args)
  }
}

export const Input = ({ setCoords }) => {

  const [inputValue, setInputValue] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [foundCities, setFoundCities] = useState([]);

  const handleReset = () => {
    setInputValue('')
    setAppliedQuery('')
  }

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length < inputValue.length) {
      setFoundCities([])
    }
    setInputValue(value);
    applayQuery(value);
  }

  const handleSubmit = (event) => {
    const index = event.currentTarget.value || 0;

    setCoords([
      foundCities[index].center[1],
      foundCities[index].center[0],
    ]);

    setFoundCities([])
    setTimeout(() => {
      handleReset()
    }, 1000);
  }

  const applayQuery = useCallback(
    debounce(setAppliedQuery, 500)
    , [])


  useEffect(() => {
    if (appliedQuery.length > 2) {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${appliedQuery}.json?access_token=pk.eyJ1IjoiYW5kcml5cHQiLCJhIjoiY2t0aWhmOWtnMTF5cjJucGVsNzdrcTJreiJ9.kbk-cwEPs5uiP6trdViiow`)
        .then(response => response.json())
        .then(res => {
          console.log(res.features);
          return setFoundCities(res.features)
        })
        .catch(err => { console.error(err) });
    }
  }, [appliedQuery])


  return (
    <div className="input">
      <div className="input__controllers">
        <input
          type="text"
          placeholder="ex: Lviv"
          value={inputValue}
          className='input__field'
          onChange={handleChange}
        />

        <button
          className="input__button"
          disabled={!foundCities.length}
          onClick={handleSubmit}
        >
          go!
        </button>
      </div>

      {!!foundCities.length &&
        < ul className="input__options">
          {
            foundCities.map((city, index) => {
              const { place_name, country } = city;

              return (
                <li
                  value={index}
                  className="input__option"
                  onClick={(event) => {
                    setInputValue(place_name)
                    handleSubmit(event)
                  }}
                >
                  <span> {place_name}</span>
                  <span>{country}</span>
                </li>
              )
            })
          }
        </ul>
      }
    </div >
  )
}
