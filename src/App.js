import "./App.css";

import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const CurrentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const ForecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    console.log(ForecastFetch);
    Promise.all([CurrentWeatherFetch, ForecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(currentWeather);
    console.log(forecast);

    console.log(searchData);
  };

  let bgImg = "bg-snow";
  if (currentWeather && typeof currentWeather.main !== "undefined") {
    if (currentWeather.main.temp > 35 && currentWeather.main.temp < 55) {
      bgImg = "bg-hot";
    } else if (currentWeather.main.temp > 20 && currentWeather.main.temp < 35) {
      bgImg = "bg-warm";
    } else if (currentWeather.main.temp > 0 && currentWeather.main.temp < 20) {
      bgImg = "bg-cool";
    }
  }

  return (
    <div className="container">
      <div className={bgImg}>
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default App;
////////
