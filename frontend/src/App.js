import React, { Component } from 'react';
import './assets/css/main.css';

class App extends Component {

  state = {
    subjects: []
  }

  callAPI() {
    fetch('/api/subjects')
      .then(res => res.json())
      .then(res => {
        this.setState({
          subjects: res
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

    const {subjects} = this.state;
    return (
      <div className="App">
        <h1>Frontend</h1>

        {
          // Display all the names of the subjects 
          subjects.map((subject, i) => (
            <p key={i}>{subject.name}</p>
          ))
        }

      </div>
    );
  }
}

export default App;
