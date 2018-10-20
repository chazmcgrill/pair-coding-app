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
    fetch("subjects")
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
    const certificates = this.state.certificates.map(cert => (
      cert._id === id ? {...cert, open: !cert.open} : cert
    ))
    this.setState({certificates})
  }

  handleSectionClick = (id) => {
    const certificates = this.state.certificates.map(cert => {
      const sections = cert.sections.map(section => (section._id === id ? {...section, open: !section.open} : section))
      return {...cert, sections}
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