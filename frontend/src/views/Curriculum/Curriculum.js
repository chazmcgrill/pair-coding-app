import React, { Component } from 'react';


class Curriculum extends Component {

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
        <div className="row">
          <h1>Frontend</h1> 
        </div>
        <div className="row">
          <ul>
            {
              // Display all the names of the subjects 
              certificates.map((cert, i) => (
                <li key={i}><h3>{cert.title}</h3></li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Curriculum;
