import React, { Component } from 'react';
import Usersandpasswords from './components/Usersandpasswords.js';
import Login from './components/Login.js'
import Createaservice from './components/Createaservice.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar,Nav,NavItem} from 'react-bootstrap';
import store from './store.js';
import './App.css';

class App extends Component {


  constructor() {
    super();

    this.state = {
      loggedIn: false
    }

    store.subscribe(() => {
      this.setState({
        loggedIn: store.getState().loggedIn
      });
    });
  }

  closeSession() {
    store.dispatch({type: "LOG_OUT", product: false})
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a >LIFTIT </a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem >
                  <Link to="/UserAndPasswords">Valid users and passwords</Link>
                </NavItem>
                <NavItem >
                  {this.state.loggedIn ? (<Link to="/createaservice">Create a service</Link>) : (<Link to="/">Log in</Link>)}
                </NavItem>
              </Nav>
              {this.state.loggedIn ? (<Nav pullRight><NavItem pullRight><Link to="/" onClick={this.closeSession.bind(this)}>Log Out</Link></NavItem></Nav>) : null}

            </Navbar.Collapse>
          </Navbar>

          <Route exact path="/" component={Login} />
          <Route path="/UserAndPasswords" component={Usersandpasswords} />
          <Route path="/createaservice" component={Createaservice} />
        </div>
      </Router>

    );
  }
}

export default App;
