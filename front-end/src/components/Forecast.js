import React, { useState } from 'react';
import ForecastTile from './ForecastTile';
import { object, bool, func } from 'prop-types';

const Forecast = ({ forecast, fetchForecasts, loading, clearForecasts, error, clearError }) => {
  const [zipCode, setZipCode] = useState('');
  const [cityName, setCityName] = useState('');
  const handleCityNameChange = (e) => setCityName(e.target.value);
  const handleZipCodeChange = (e) => setZipCode(e.target.value);

  const handleZipCodeSubmit = (e) => {
    e.preventDefault();
    clearForecasts();
    clearError();
    fetchForecasts({ zipCode });
  };

  const handleCityNameSubmit = (e) => {
    e.preventDefault();
    clearForecasts();
    clearError();
    fetchForecasts({ cityName });
  };
  return (
    <div className="container">
    <h1 className="header">Search By City Name or Zip Code</h1>
    <div>
      <form onSubmit={e => e.preventDefault()}>
      <label htmlFor="zipCode">ZipCode: </label>
      <input required type="text" id="zipCode" name="zipCode" onChange={handleZipCodeChange} value={zipCode}/>
      <button  onClick={handleZipCodeSubmit} >Search</button>
    </form>
    <form onSubmit={e => e.preventDefault()}>
      <label htmlFor="cityName">City Name: </label>
      <input required type="text" id="cityName" name="cityName" onChange={handleCityNameChange} value={cityName} />
      <button  onClick={handleCityNameSubmit}>Search</button>
    </form>
    </div>
    {
      forecast.city && forecast.state && (
        <div className="city-info">Closest Match: {forecast.city}, {forecast.state}</div>
      )
    }
    <div className="forecast-container">
      {
        loading && (
          <div> Loading ... </div>
        )
      }
      {
        error.status && (
          <div> {error.message} </div>
        )
      }
      {
      forecast.forecast.map(({
        the_temp: temp,
        max_temp: maxTemp,
        min_temp: minTemp,
        weather_state_name: condition,
        applicable_date: date
      }, i) => (
        <ForecastTile key={i} date={date} temp={temp} maxTemp={maxTemp} minTemp={minTemp} condition={condition}/>
      ))
    }
    </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .city-info {
          margin-top: 2rem;
        }
        .forecast-container {
          margin-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

Forecast.propTypes = {
  forecast: object,
  fetchForecasts: func,
  loading: bool,
  error: object,
  clearError: func,
  clearForecasts: func,
};

export default Forecast;
