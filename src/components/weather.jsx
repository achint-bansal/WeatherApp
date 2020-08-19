import React, { Component } from "react";
import "./style.css";

export default class Weather extends Component {
  render() {
    return (
      <div className="weather">
        <p className="city m-10">{this.props.city}</p>
        {this.props.temp ? (
          <p className="temp m-10">{this.props.temp}&deg;</p>
        ) : null}
        <p className="description m-10">
          {this.props.description.charAt(0).toUpperCase() +
            this.props.description.slice(1)}
        </p>
        <p className="">
          <i className={`wi ${this.props.weatherIcon} weatherIcon m-10`} />
        </p>
        {this.props.feels_like ? (
          <p className="feelsLike m-10">
            Feels Like {this.props.feels_like}&deg;
          </p>
        ) : null}
        {this.props.temp_max ? (
          <div className="minmax m-10">
            <div className="minTemp">
              <p>Minimum</p>
              <p>{this.props.temp_min}&deg;</p>
            </div>
            <div className="maxTemp">
              {" "}
              <p>Maximum</p>
              <p>{this.props.temp_max}&deg;</p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
