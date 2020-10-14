import React, { useState, useEffect } from 'react'
import Weather from './Weather'

import axios from 'axios'

const Country = props => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
      console.log(api_key)
    const getWeather = async () => {
      const response = await axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.country.name}`)
      setWeather(response.data)
    }
    getWeather()
  }, [])

  return (
    <div>
      <h1>{props.country.name}</h1>
      <p>capital {props.country.capital}</p>
      <p>population {props.country.population}</p>
      <h3>languages</h3>
      <ul>
        {
          props.country.languages.map(language =>
            <li key={language.name}>{language.name}</li>
          )
        }
      </ul>
      <img width='100' src={props.country.flag} alt={`flag of ${props.country.name}`} />
      {
        weather &&
        <Weather weather={weather} />
      }
    </div>
  )
}

export default Country
