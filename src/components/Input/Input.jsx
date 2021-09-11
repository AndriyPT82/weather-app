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
      foundCities[index].latitude,
      foundCities[index].longitude,
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
      fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10&offset=0&namePrefix=${appliedQuery}&types=CITY&sort=-population`, {
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          data: { "query": '{ cities }' }
        }
      })
        .then(response => response.json())
        .then(res => setFoundCities(res.data))
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
              const { name, country } = city;

              return (
                <li
                  value={index}
                  className="input__option"
                  onClick={(event) => {
                    setInputValue(name)
                    handleSubmit(event)
                  }}
                >
                  <span> {name}</span>
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
