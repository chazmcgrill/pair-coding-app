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

const API_URL = 'http://127.0.0.1:5000';
const socket = io(API_URL);

export default class App extends Component {
  state = {
    certificates: [],
    loaded: false,
    isModalOpen: false,
    user: {},
    disabled: false,
    popup: null
  }

  componentDidMount() {
    socket.on('github', user => {
      this.state.popup.close();
      this.setState({
        user,
        isModalOpen: false
      })
    })
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this.state
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        this.setState({ disabled: false })
      }
    }, 1000)
  }

  openPopup() {
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerWidth / 2) - (height / 2)

    const url = `${API_URL}/api/auth?socket-id=${socket.id}`

    return window.open(url, '', `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  startAuth = () => {
    if (!this.state.disabled) {
      this.checkPopup()
      this.setState({
        disabled: true,
        popup: this.openPopup()
      })
    }
  }

  closeCard() {
    this.setState({ user: {} })
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
      { ...cert, open: !cert.open && cert._id === id }
    ));
    this.setState({certificates})
  }

  handleSectionClick = (id) => {
    const certificates = this.state.certificates.map(cert => {
      const sections = cert.sections.map(section => ({ ...section, open: !section.open && section._id === id}))
      return {...cert, sections}
    })
    this.setState({certificates})
  }

  handleModalClick = () => {
    this.setState({isModalOpen: !this.state.isModalOpen})
  }

  render() {
    const { disabled } = this.state
    return (
      <BrowserRouter>
        <React.Fragment>
            <NavBar user={this.state.user} openModal={this.handleModalClick}/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route 
                exact path="/Curriculum" 
                render={() =>
                  <Curriculum 
                    certificates={this.state.certificates} 
                    loaded={this.state.loaded} 
                    callAPI={this.callAPI} 
                    handleCertClick={this.handleCertClick}
                    handleSectionClick={this.handleSectionClick}
                  />} 
              />
              <Route exact path="/Grid" component={Grid} />
              <Route exact path="/login"
                render={() =>
                  <Login
                    auth={this.startAuth}
                    component={Login}
                    disabled={disabled}
                  />}
              />
              <Route component={NoMatch} />
            </Switch>
            {this.state.isModalOpen &&
                <Modal
                  auth={this.startAuth} 
                  disabled={disabled}
                  closeModal={this.handleModalClick}
                />
            }
            </React.Fragment>
        </BrowserRouter>
    );
  };
}