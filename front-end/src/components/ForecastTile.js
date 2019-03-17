import React from 'react';
import { string, number } from 'prop-types';
import convert from 'converture';

const renderImage = (condition) => {
  switch (condition) {
    case 'Snow':
      return (<img src='/static/wi-snow.svg' />);
    case 'Sleet':
      return (<img src='/static/wi-sleet.svg' />);
    case 'Hail':
      return (<img src='/static/wi-hail.svg' />);
    case 'Thunderstorm':
      return (<img src='/static/wi-thunderstorm.svg' />);
    case 'Heavy Rain':
      return (<img src='/static/wi-rain.svg' />);
    case 'Light Rain':
      return (<img src='/static/wi-sprinkle.svg' />);
    case 'Showers':
      return (<img src='/static/wi-showers.svg' />);
    case 'Heavy Cloud':
      return (<img src='/static/wi-cloudy.svg' />);
    case 'Light Cloud':
      return (<img src='/static/wi-cloud.svg' />);
    case 'Clear':
      return (<img src='/static/wi-day-sunny.svg' />);
    default:
      return (<img src='/static/wi-day-sunny.svg' />);
  }
};

const ForecastTile = ({ temp, maxTemp, minTemp, condition, date }) => (
  <div className="container">
    <div className="info">
      <div><strong>Date:</strong> {date}</div>
      <div><strong>Temperature:</strong> {convert.celsius(temp).toFahrenheit()} &#176;F</div>
      <div><strong>Max Temp:</strong> {convert.celsius(maxTemp).toFahrenheit()} &#176;F</div>
      <div><strong>Min Temp:</strong> {convert.celsius(minTemp).toFahrenheit()} &#176;F</div>
      <div><strong>Conditions:</strong> {condition}</div>
    </div>
    {renderImage(condition)}
    <style jsx>{`
      .container {
        display: flex;
        width: 12.5rem;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .info {
        align-items: left;
      }
    `}</style>
  </div>
);

ForecastTile.propTypes = {
  temp: number,
  maxTemp: number,
  minTemp: number,
  condition: string,
  date: string
};

export default ForecastTile;
