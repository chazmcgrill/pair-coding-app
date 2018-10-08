import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import Curriculum from './pages/Curriculum';
import NavBar from './components/NavBar';
import NoMatch from './pages/NoMatch';
import Home from './pages/Home';
import Grid from './pages/Grid';

export default class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <React.Fragment>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Curriculum" component={Curriculum} />
              <Route exact path="/Grid" component={Grid} />
              <Route component={NoMatch} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  };
}