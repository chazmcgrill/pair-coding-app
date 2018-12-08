import React, {Component} from "react";
import CertAccordion from '../components/CertAccordion';
import LoadingSpinner from "../components/LoadingSpinner";

class Curriculum extends Component {
    state = {
      certificates: [],
      loaded: false,
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

  componentDidMount() {
    this.callAPI();
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

  render() {
    const { certificates } = this.state;
    return (
      <main>
        <div className="row">
          <div className="col col--main">
            {this.state.loaded ? <CertAccordion certificates={certificates} handleCertClick={this.handleCertClick} handleSectionClick={this.handleSectionClick} /> : <LoadingSpinner />}
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
      </main>
    )
  }
}

// const Curriculum = ({ loaded, handleCertClick, certificates, callAPI, handleSectionClick }) => {
//   if (!loaded) callAPI();
//   return (
//     <main>
//       <div className="row">
//         <div className="col col--main">
//           {loaded ? <CertAccordion certificates={certificates} handleCertClick={handleCertClick} handleSectionClick={handleSectionClick} /> : <LoadingSpinner />}
//         </div>
//         <div className="col col--side">
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//             enim ad minim veniam, quis nostrud exercitation ullamco laboris
//             nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
//             reprehenderit in voluptate velit esse cillum dolore eu fugiat
//             nulla pariatur. Excepteur sint occaecat cupidatat non proident,
//             sunt in culpa qui officia deserunt mollit anim id est laborum.
//             Donec elementum ligula eu sapien
//           </p>
//         </div>
//       </div>
//     </main>
//   )
// }

export default Curriculum;
