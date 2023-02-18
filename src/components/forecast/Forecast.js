import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import styled from "styled-components";

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
  const forcastDay = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );
  console.log(forcastDay);

  return (
    <Components>
      <label className="title">Weekly Forecast</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="item">
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    alt="forecast"
                    className="icon"
                  />
                  <label className="day">{forcastDay[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_min)}°C /
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="details-grid">
                <div className="details-grid-item">
                  <label>Pressure</label>
                  <label>{item.main.pressure}hPa</label>
                </div>

                <div className="details-grid-item">
                  <label>Humididty</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className="details-grid-item">
                  <label>Clouds</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="details-grid-item">
                  <label>Wind</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="details-grid-item">
                  <label>Feels Like</label>
                  <label>{item.main.feels_like}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Components>
  );
};
const Components = styled.div`
  .title {
    font-size: 23px;
    font-weight: 700;
    color: whitesmoke;
  }
  .item {
    background-color: #f4f4f4;
    border-radius: 15px;
    height: 40px;
    margin: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    padding: 10px 20px;
  }
  .icon {
    width: 40px;
  }
  .day {
    color: #6b6969;
    flex: 1 1;
    font-weight: 600;
    margin-left: 15px;
  }
  .description {
    flex: 1 1;
    margin-right: 15px;
    text-align: right;
  }
  .min-max {
    color: #757575;
  }
  .details-grid {
    grid-row-gap: 0;
    grid-column-gap: 15px;
    row-gap: 0;
    column-gap: 15px;
    display: grid;
    flex: 1 1;
    grid-template-columns: auto auto;
    padding: 5px 15px;
  }
  .details-grid-item {
    display: flex;
    height: 30px;
    justify-content: space-between;
    align-items: center;
  }
  .details-grid-item label:first-child {
    color: #949494;
  }
  .details-grid-item label:last-child {
    color: #dcdcdc;
  }
`;

export default Forecast;
