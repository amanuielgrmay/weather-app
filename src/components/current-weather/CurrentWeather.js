import React from "react";
import styled from "styled-components";

const CurrentWeather = ({ data }) => {
  return (
    <Components>
      <div className="weather">
        <div className="top">
          <div>
            <p className="city">{data.city}</p>
            <p className="description">{data.weather[0].description}</p>
          </div>
          <img
            src={`icons/${data.weather[0].icon}.png`}
            alt="weather"
            className="icons"
          />
        </div>
        <div className="bottom">
          <p className="temperature">{Math.round(data.main.temp)}°C</p>
          <div className="details">
            <div className="row">
              <span className="label">Details</span>
            </div>
            <div className="row">
              <span className="label">Feels Like</span>
              <span className="value">
                {Math.round(data.main.feels_like)}°C
              </span>
            </div>
            <div className="row">
              <span className="label">Wind</span>
              <span className="value">{data.wind.speed} m/s</span>
            </div>
            <div className="row">
              <span className="label">Humidity</span>
              <span className="value">{Math.round(data.main.humidity)}%</span>
            </div>
            <div className="row">
              <span className="label">Pressure</span>
              <span className="value">
                {Math.round(data.main.pressure)} hPa
              </span>
            </div>
          </div>
        </div>
      </div>
    </Components>
  );
};
const Components = styled.div`
  .weather {
    width: 300px;
    border-radius: 6px;
    box-shadow: 10px -2px 20px 2px rgb(0 0 0 / 30%);
    color: white;
    background-color: rgba(51, 51, 51, 0.8);
    margin: 20px auto 300px auto;
    padding: 20px;
  }

  .top,
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .city {
    font-weight: 600;
    font-size: 18px;
    line-height: 1;
    margin: 0;
    letter-spacing: 1px;
  }
  .description {
    font-weight: 400;
    font-size: 14px;
    line-height: 1;
    margin: 0;
  }
  .icon {
    width: 100px;
  }
  .temperature {
    font-weight: 600;
    font-size: 70px;
    width: auto;
    letter-spacing: -5px;
    margin: 10, 0;
  }
  .details {
    width: 100%;
    padding-left: 20px;
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
  .label {
    text-align: left;
    font-weight: 400;
    font-size: 12px;
  }
  .value {
    text-align: right;
    font-weight: 600;
    font-size: 12px;
  }
`;

export default CurrentWeather;
