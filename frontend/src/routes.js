import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { NavBar } from './components/NavBar';
import { Home } from './views/Home';
import { Curriculum } from './views/Curriculum';
import { NoMatch } from './views/NoMatch';

export class Routes extends React.Component {

  render() {
  return (
    <React.Fragment>
      <NavBar />
        
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Curriculum" component={Curriculum} />
        <Route component={NoMatch} />
      </Switch>
    </React.Fragment>
  );
  }
};
