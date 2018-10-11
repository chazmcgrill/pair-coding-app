import React, { Component } from "react";
import ListView from '../components/ListView';


class Curriculum extends Component {

  componentDidMount() {
    if(!this.props.loaded) {
      this.props.callAPI();
    }
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <h1>Curriculum</h1>
        </div>

        <div className="row">
          <div className="col col--main">
          {this.props.loaded ? <ListView certificates={this.props.certificates} /> : ''}
            
          </div>
          <div className="col col--side">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Donec elementum ligula eu sapien
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Curriculum;
