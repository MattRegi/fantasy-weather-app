import React, {useState} from "react"
import "./Weather.css"
import search_icon from '../assets/search.png'
import sunny_icon from '../assets/sunny.png'
import humidity_icon from "../assets/humidity.png"
import wind_icon from "../assets/wind.png"
import drizzle_icon from "../assets/drizzle.png"
import snow_icon from "../assets/snow.png"
import rain_icon from "../assets/rain.png"
import cloudy_icon from "../assets/cloudy.png"


function Weather() {

    const [searchInput, setSearchInput] = useState("");
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
            "01d" : sunny_icon,
            "01n" : sunny_icon,
            "02d" : cloudy_icon,
            "02n" : cloudy_icon,
            "03d" : cloudy_icon,
            "03n" : cloudy_icon,
            "04d" : drizzle_icon,
            "04n" : drizzle_icon,
            "09d" : rain_icon,
            "09n" : rain_icon,
            "10d" : rain_icon,
            "10n" : rain_icon,
            "13d" : snow_icon,
            "13n" : snow_icon,
        }

        const weatherDesc = {
            "01d" : "The Great Dragon's Fire Smiles Upon The Realm Today.",
            "01n" : "The Great Dragon's Fire Smolders Upon The Realm Tonight.",
            "02d" : "A Sorcerer's hath cast a viel across the sky!",
            "02n" : "A Sorcerer's hath cast a viel across the sky!",
            "03d" : "A Sorcerer's hath cast a viel across the sky!",
            "03n" : "A Sorcerer's hath cast a viel across the sky!",
            "04d" : "Thank the Wizard! Rain spells help to replenish the crops!",
            "04n" : "Thank the Wizard! Rain spells help to replenish the crops!",
            "09d" : "The Sky Weaps With Dispair, As The Wizards Continue To Battle With Lightning Casted From The Sky!",
            "09n" : "The Sky Weaps With Dispair, As The Wizards Continue To Battle With Lightning Casted From The Sky!",
            "10d" : "The Sky Weaps With Dispair, As The Wizards Continue To Battle With Lightning Casted From The Sky!",
            "10n" : "The Sky Weaps With Dispair, As The Wizards Continue To Battle With Lightning Casted From The Sky!",
            "13d" : "The Frost Elves Continue To Push Further Into the Kingdom, Bringing Along Frigid Temps And Snowfall",
            "13n" : "The Frost Elves Continue To Push Further Into the Kingdom, Bringing Along Frigid Temps And Snowfall",
        }

    const search = async (city) => {
        try {
            if(city === "") {
                alert("Enter City Name")
                return;
            }
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_APP_ID}`;

            const responce = await fetch(url);
                        const data = await responce.json();
                        console.log(data);
                        const icon = allIcons[data.weather[0].icon] || sunny_icon;
                        const description = weatherDesc[data.weather[0].icon] || "The Great Dragon's Fire Smiles Upon The Realm Today.";
                        setWeatherData({
                            humidity: data.main.humidity,
                            windSpeed: data.wind.speed,
                            temperature: Math.floor(data.main.temp),
                            location: data.name,
                            icon: icon,
                            desc: description,
                            });
        } catch (error) {
            setWeatherData(false);
            alert("City Not Found. Try again.");
            console.error("Error in fetching weather data");
        }
    } 

return (
    <div className="weatherBox">
        <div className="searchBar">
            <input type="text" onChange={(e) => setSearchInput(e.target.value)} value={searchInput} className='userInput' placeholder='Search For Your Realm' style={{width: '300px'}} onKeyDown={(e) => { if (e.key === 'Enter') {search(searchInput)}}}></input>
            <img src={search_icon} alt="search image" onClick={() => search(searchInput)}></img>
        </div>
        {weatherData && (
            <>
            <div> 
                <img className="weather-icon" src={weatherData.icon} alt="weather icon"></img> 
            </div>
            <p className="location">{weatherData.location}</p>
            <p className="temperature">{weatherData.temperature}</p>
            <div className="weather-info">
                <div className="statCol">
                    <img src={humidity_icon} alt="humidity"></img>
                    <span>
                        <p>{weatherData.humidity}%</p>
                        <p>Humidity</p>
                    </span>
                </div>
                <div className="statCol">
                    <img src={wind_icon} alt="wind speed"></img>
                    <span>
                        <p>{weatherData.windSpeed} mph</p>
                        <p>Wind Speed</p>
                    </span>
                </div>
                
            </div>
            <p className="weatherDesc">{weatherData.desc}</p>
            </>
        )}
        
    </div>
)}

export default Weather