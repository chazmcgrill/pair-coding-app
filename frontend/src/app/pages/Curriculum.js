import React from "react";
// import CertAccordion from '../components/CertAccordion';
import LoadingSpinner from "../components/LoadingSpinner";

const Curriculum = ({ loaded, handleCertClick, certificates, callAPI, handleSectionClick }) => {
  if (!loaded) callAPI()
  return (
    <section className="App">
      <div className="row">
        <h1>Curriculum</h1>
      </div>

      <div className="row">
        <div className="col col--main">
          {/* {loaded ? <CertAccordion certificates={certificates} handleCertClick={handleCertClick} handleSectionClick={handleSectionClick} /> : <LoadingSpinner />} */}
          <LoadingSpinner />
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
    </section>
  )
}

export default Curriculum;
