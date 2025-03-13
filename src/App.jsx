import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [userinp, setUserinp] = useState("karachi");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = async () => {
    if (!userinp) return;
    try {
      let response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=c96f9250b3cb403da06155302241512&q=${userinp}&aqi=no`
      );
      setData(response.data);
    } catch (error) {
      setError("City not found! Try another one.");
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
    setLoading(false);
  }, []);

  return (
    <div className="weather-container">
      <div className="background"></div>

      <div className="weather-card">
        <h2 className="title">Weather Forecast</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name..."
            value={userinp}
            onChange={(e) => setUserinp(e.target.value)}
          />
          <button onClick={getData}>
            <i className="fas fa-search"></i>
          </button>
        </div>

        {loading && <p className="loading">Fetching data...</p>}
        {error && <p className="error">{error}</p>}

        {/* Weather Info */}
        {data && (
          <div className="weather-info">
            <h2>
              {data.location.name}, {data.location.country}
            </h2>
            <p className="temperature">{data.current.temp_c}°C</p>
            <p className="condition">{data.current.condition.text}</p>

            <div className="details">
              <p className="details-itm">
                <i className="fas fa-thermometer-half "></i> Feels Like:{" "}
                {data.current.feelslike_c}°C
              </p>
              <p className="details-itm">
                <i className="fas fa-tint"></i> Humidity:{" "}
                {data.current.humidity}%
              </p>
              <p className="details-itm">
                <i className="fas fa-wind"></i> Wind: {data.current.wind_kph}{" "}
                km/h
              </p>
            </div>

            <img
              src={data.current.condition.icon}
              alt="weather icon"
              className="weather-icon"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
