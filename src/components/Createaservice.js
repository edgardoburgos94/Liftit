import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import axios from 'axios';
import store from '../store';
import {Redirect} from 'react-router-dom'

class Createaservice extends Component {

  constructor() {
    super();

    this.state = {
      loggedIn: false,
      origin:'Medellín, calle 50a 86-445',
      destiny:'Medellín, calle 45e 72-57',
      distance: '',
      duration:''
    }

    this.changeOrigin = this.changeOrigin.bind(this);
    this.changeDestiny = this.changeDestiny.bind(this);
    this.calculateTimeAndDistance = this.calculateTimeAndDistance.bind(this);

    store.subscribe(() => {
      this.setState({
        loggedIn: store.getState().loggedIn
      });
    });
  }

  changeOrigin(e) {
    this.setState({
      origin: e.target.value
    })
  }

  changeDestiny(e) {
    this.setState({
      destiny: e.target.value
    })
  }

  calculateTimeAndDistance() {
    axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+this.state.origin+'&destinations='+this.state.destiny+'&key=AIzaSyDBMX1HvWisu-Uv7q9a3TRzP-wWcPAPkuA')
    .then(response=> {
      this.setState({
        duration: response.data.rows[0].elements[0].duration.text,
        distance: response.data.rows[0].elements[0].distance.text
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    return (

      <div className="container">

        <h1>Create a service </h1>

        <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="formBasicText">
          <ControlLabel>Enter origin direction:</ControlLabel>
          <FormControl
            type="text"
            placeholder="Medellín, calle 50a 86-445"
            onChange={this.changeOrigin}
            value={this.state.origin}
          />
        </FormGroup>

        <FormGroup controlId="formBasicText">
          <ControlLabel>Enter destiny direction:</ControlLabel>
          <FormControl
            type="text"
            placeholder="Medellín, calle 45e 72-57"
            onChange={this.changeDestiny}
            value={this.state.destiny}
          />
        </FormGroup>

        <Button type="submit" bsStyle="primary" onClick={this.calculateTimeAndDistance}>Calculate time and distance</Button>

        <h4>Estimated time: {this.state.duration}</h4>
        <h4>Estimated distance: {this.state.distance}</h4>

      </form>
      </div>



    );
  }
}

export default Createaservice;
