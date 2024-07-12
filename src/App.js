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
  };

  const getCurrentLocalTime = (timezoneOffset) => {
    const currentTime = new Date();
    const localTime = new Date(
      currentTime.getTime() +
        timezoneOffset * 1000 +
        currentTime.getTimezoneOffset() * 60000
    );
    return localTime;
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      <div className="bg-img" id="container-weather">
        <div className="weather-leftside">
          {currentWeather && (
            <CurrentWeather
              data={currentWeather}
              getCurrentLocalTime={getCurrentLocalTime}
              className="current-weather-usu"
            />
          )}
          {forecast && <Forecast data={forecast} />}
        </div>
        <div className="weather-rightside">
          {currentWeather && (
            <CurrentWeather
              className="current-weather-diff"
              data={currentWeather}
              getCurrentLocalTime={getCurrentLocalTime}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
