import { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({}); // intial weather is an empty object

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      console.log(data);
      setWeather(data);
      setQuery("");
    }
  };
  /*
a weather data object fetch from api:
base: "stations"
clouds: {all: 40}
cod: 200
coord: {lon: -121.895, lat: 37.3394}
dt: 1623220745
id: 5392171
main: {temp: 11.97, feels_like: 11, temp_min: 10.21, temp_max: 13.5, pressure: 1020, …}
name: "San Jose"
sys: {type: 2, id: 2004102, country: "US", sunrise: 1623156412, sunset: 1623209209}
timezone: -25200
visibility: 10000
weather: Array(1)
0: {id: 802, main: "Clouds", description: "scattered clouds", icon: "03n"}
length: 1
__proto__: Array(0)
wind: {speed: 1.34, deg: 248, gust: 3.58}
__proto__: Object

if weather.main exists, return weather.name, weather.sys.country and weather.main.temp

*/

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="search ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      ></input>
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            ></img>
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
