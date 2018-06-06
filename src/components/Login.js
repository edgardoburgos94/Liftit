import React, { Component } from 'react';
import store from '../store'
import { Button,Form, FormGroup, ControlLabel,FormControl,Col} from 'react-bootstrap';
import axios from 'axios';
import  { Redirect } from 'react-router-dom';


class Login extends Component {

  constructor() {
    super();

    this.state = {
      user:'test1',
      password:'123456',
      loggedIn: false
    }

    store.subscribe(() => {
      this.setState({
        loggedIn: store.getState().loggedIn
      });
    });

    this.handleSubmit =this.handleSubmit.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
  }

  updateUser(e) {
    this.setState ({
      user: e.target.value
    })
  }

  updatePassword(e) {
    this.setState ({
      password: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    axios.get('http://localhost:3001/users')
    .then(response=> {
      if (response.data[this.state.user] === this.state.password) {
        store.dispatch({type: "SUCCESSFUL_LOGIN", product: true})
        return <Redirect to="/createaservice"/>
      } else {
        alert("Usuario o contraseña incorrecto")
      };
    })
    .catch(error => {
      console.log(error);
    })
  }



  render() {
    return (
      <div className="container">
        <h1>Log In</h1>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalUser">
            <Col componentClass={ControlLabel} sm={2}>
              User:
            </Col>
            <Col sm={4}>
              <FormControl type="text" placeholder="User" onChange={this.updateUser} value={this.state.user} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password:
            </Col>
            <Col sm={4}>
              <FormControl type="password" placeholder="Password" onChange={this.updatePassword} value={this.state.password}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Sign in</Button>
            </Col>
          </FormGroup>
          <h1></h1>
        </Form>
        {(this.state.loggedIn) ? (<Redirect to="/createaservice"/>) : null}
      </div>
    );
  }

}

export default Login;
