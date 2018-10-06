import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import NavBar from './NavBar';
import Curriculum from './Curriculum';
import NoMatch from './NoMatch';
import Home from './Home';

export default class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Curriculum" component={Curriculum} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  };
}