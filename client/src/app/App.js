import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import io from 'socket.io-client';
import Curriculum from './pages/Curriculum';
import NavBar from './components/NavBar';
import Modal from './components/Modal';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Home from './pages/Home';
import Grid from './pages/Grid';

const socket = io('http://localhost:5000');

export default class App extends Component {
  state = {
    certificates: [],
    loaded: false,
    isModalOpen: false,
    user: {},
  };

  popup = null;

  // Routinely checks the popup to re-enable the login button 
  // if the user closes the popup without authenticating.
  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        this.setState({ disabled: '' })
      }
    }, 1000)
  }

  // Launches the popup on the server and passes along the socket id so it 
  // can be used to send back user data to the appropriate socket on 
  // the connected client.
  openPopup() {
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${API_URL}/twitter?socketId=${socket.id}`

    return window.open(url, '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  // Kicks off the processes of opening the popup on the server and listening 
  // to the popup. It also disables the login button so the user can not 
  // attempt to login to the provider twice.
  startAuth() {
    if (!this.state.disabled) {
      this.popup = this.openPopup()
      this.checkPopup()
      this.setState({ disabled: 'disabled' })
    }
  }

  closeCard() {
    this.setState({ user: {} })
  }

  componentDidMount() {
    socket.on('user', user => {
      this.popup.close();
      this.setState({user});
    })
  }

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