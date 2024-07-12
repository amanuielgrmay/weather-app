import React from "react";
import "./CurrentWeather.css";
import water from "../../imgs/water.png";
import wind from "../../imgs/wind.png";
const CurrentWeather = ({ data, getCurrentLocalTime, className }) => {
  const localTime = getCurrentLocalTime(data.timezone);
  const date = localTime.toLocaleDateString();
  const time = localTime.toLocaleTimeString();

  return (
    <div className="weather">
      <div className={className} id="top">
        <div className="top-center">
          <p className="city">{data.city}</p>
          <p className="date">{date}</p>
          <p className="date">{time}</p>
        </div>
        <div className="top-details">
          <div id="top-details_first">
            <p className="temp">{Math.round(data.main.temp)}°C</p>
            <p className="description">{data.weather[0].description}</p>
          </div>
          <div className="top-details_second">
            <div className="row details-wind">
              <img className="label" src={wind} />
              <span className="value"> {data.wind.speed} m/s</span>
            </div>
            <div className="row">
              <img className="label" src={water} />
              <span className="value"> {Math.round(data.main.humidity)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
