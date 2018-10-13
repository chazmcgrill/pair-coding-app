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
      .then(certificates => {
        this.setState({
          certificates,
          loaded: true
        });
      })
      .catch(err => {
        console.log(err)
      });
  }

  handleCertClick = (id) => {
    const certificates = this.state.certificates.map(c => (
      c._id === id ? {...c, open: !c.open} : c
    ))
    this.setState({certificates})
  }

  handleSectionClick = (id) => {
    const certificates = this.state.certificates.map(c => {
      const sections = c.sections.map(s => (s._id === id ? {...s, open: !s.open} : s))
      return {...c, sections}
    })
    this.setState({certificates})
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <React.Fragment>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route 
                exact path="/Curriculum" 
                render={() => <Curriculum 
                  certificates={this.state.certificates} 
                  loaded={this.state.loaded} 
                  callAPI={this.callAPI} 
                  handleCertClick={this.handleCertClick}
                  handleSectionClick={this.handleSectionClick}
                />} 
              />
              <Route exact path="/Grid" component={Grid} />
              <Route component={NoMatch} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  };
}