import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import Curriculum from './pages/Curriculum';
import NavBar from './components/NavBar';
import NoMatch from './pages/NoMatch';
import Home from './pages/Home';
import Grid from './pages/Grid';

export default class App extends Component {


  state = {
    certificates: [],
    loaded: false
  };

  callAPI = () => {
    fetch("/api/subjects")
      .then(res => res.json())
      .then(res => {
        this.setState({
          certificates: res,
          loaded: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <React.Fragment>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Curriculum" render={() => <Curriculum certificates={this.state.certificates} loaded={this.state.loaded} callAPI={this.callAPI} />} />
              <Route exact path="/Grid" component={Grid} />
              <Route component={NoMatch} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  };
}