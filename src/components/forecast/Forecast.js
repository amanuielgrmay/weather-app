import React from "react";
import "./Forecast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      <label className="title">Weekly Forecast</label>
      <div className="accordion">
        {data.list.slice(0, 7).map((item, idx) => (
          <div className="accordion-item" key={idx}>
            <div className="accordion-item-button">
              <div className="item">
                <label className="day">{forecastDays[idx]}</label>
              </div>
              <div className="item">
                <label className="min-max">
                  {Math.round(item.main.temp_min)}°C{" "}
                </label>
              </div>
            </div>
            <div className="details-grid">
              <div className="details-grid-item">
                <label>Humidity </label>
                <label>{item.main.humidity}%</label>
              </div>
              <div className="details-grid-item">
                <label>Clouds </label>
                <label>{item.clouds.all}%</label>
              </div>
              <div className="details-grid-item">
                <label>Wind </label>
                <label>{item.wind.speed} m/s</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Forecast;
