import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import Curriculum from './pages/Curriculum';
import NavBar from './components/NavBar';
import Modal from './components/Modal';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Home from './pages/Home';
import Grid from './pages/Grid';

export default class App extends Component {
  state = {
    certificates: [],
    loaded: false,
    isModalOpen: false
  };

  callAPI = () => {
    fetch("api/subjects")
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

  handleModalClick = () => {
    this.setState({isModalOpen: !this.state.isModalOpen})
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
            <NavBar openModal={this.handleModalClick}/>
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
              <Route exact path="/login" component={Login} />
              <Route component={NoMatch} />
            </Switch>
            {this.state.isModalOpen && <Modal closeModal={this.handleModalClick} open={this.state.isModalOpen}/>}
            </React.Fragment>
        </BrowserRouter>
    );
  };
}