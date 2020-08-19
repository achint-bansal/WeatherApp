import React, { Component } from "react";
import "./style.css"

export default class Form extends Component {
  errors = () =>{
      alert("Please Enter both City and Country !! ");
  }
  render() {
    return (
      <div className="">
          <div>{this.props.error ? this.errors() : ""}</div>
          
        <form onSubmit={this.props.findWeather}>
          <input type="text" name="city" placeholder="City"/>
          <input type="text" name="country" placeholder="Country"/>
          <button className="btn ">Search</button>
        </form>
      </div>
    );
  }
}
