import { object } from 'prop-types';
import React, { useState } from 'react';
const api = {
  key: "47dc28e66d7308fd83e60025c403d365",
  base: "http://api.openweathermap.org/data/2.5/",
}

function App() {

  const[query, setQuery] = useState('');
  const[weather, setWeather] = useState({});
 
    const search = evt =>{
      if(evt.key === "Enter" ){
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          
          console.log(result);
      });
    }

  }

  const datebuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={ 'App'}>
        <main>
            <div className = "search-box">
                <input type = "text"
                className = "search-bar"
                placeholder = "Search..."
                onChange = {e => setQuery(e.target.value)}
                value = {query}
                onKeyPress = {search}
                />
                <button className = "search-button" 
                type = "submit"
                ><ion-icon name="search-circle-outline" ></ion-icon>
                </button>
            </div>
            
            {(typeof weather.main != "undefined") ? (
            <div>
              <div className = "location-box">
                  <div className = "location">{weather.name}, {weather.sys.country}</div>
                  <div className = "date">{datebuilder(new Date())}</div>
              </div>
              <div className = "weather-box">
                <div className = "temp">Temperature: {Math.round(weather.main.temp)} °C</div>
                <div className = "humidity">Humidity: {weather.main.humidity} %</div>
                <div className = "wind">Wind Speed: {Math.round(weather.wind.speed)} km/h</div>
                <div className = "weather">Description: {weather.weather[0].description}</div>
              </div>  
          </div> ) : (<div className = "welcome"> Welcome to Edgar's <br/> Weather Application</div>)}
        </main>
    </div>
  );
}

export default App;