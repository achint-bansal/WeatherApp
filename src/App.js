import React, { Component } from "react";
import Form from "./components/form";
import Weather from "./components/weather";
import "weather-icons/css/weather-icons.css";
import "./App.css";

const Api_Key = "429736441cf3572838aa10530929f7cd";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      // main: undefined,
      celsius: undefined,
      feels_like: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false,
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }
  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if (country && city) {
      // if (location.protocol === 'http:') {
      //  var  url= 'http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}';
      // }
      // else{
      //  var url='https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}';
      // }
      const api_call = await fetch(
        
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
      );

      const response = await api_call.json();

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        // main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        feels_like: this.calCelsius(response.main.feels_like),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false,
      });
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
      console.log(response);
    } else {
      this.setState({
        error: true,
      });
    }
  };

  render() {
    return (
      <div className="weather-card shadow-lg p-3 mb-5  rounded">
        <Form findWeather={this.getWeather} error={this.state.error} />
        <div className="row justify-content-center">
          <Weather
            city={this.state.city}
            weatherIcon={this.state.icon}
            temp={this.state.celsius}
            feels_like={this.state.feels_like}
            temp_max={this.state.temp_max}
            temp_min={this.state.temp_min}
            description={this.state.description}
          />
        </div>
      </div>
    );
  }
}
