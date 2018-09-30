import React, { Component } from 'react';
import './assets/css/main.css';

class App extends Component {

  state = {
    certificates: []
  }

  callAPI() {
    fetch('/api/subjects')
      .then(res => res.json())
      .then(res => {
        this.setState({
          certificates: res
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {

    const {certificates} = this.state;
    return (
      <div className="App">
        <h1>Frontend</h1>

        {
          // Display all the names of the subjects 
          certificates.map((cert, i) => (
            <h3 key={i}>{cert.title}</h3>
          ))
        }

      </div>
    );
  }
}

export default App;
