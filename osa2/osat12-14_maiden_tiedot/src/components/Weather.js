import React from 'react'

const Weather = props => {
    console.log(props.weather)
    return (
    <div>
      <h3>Weather in {props.weather.location.name}</h3>
      <h4>temperature: {props.weather.current.temperature} Celsius</h4>
      <img width='50' src={props.weather.current.weather_icons} alt={`Weather icon for ${props.weather.current.weather_descriptions}`} />
      <h4>wind: {props.weather.current.wind_speed} mph direction {props.weather.current.wind_dir}</h4>
    </div >
  )
}

export default Weather
