import React, {Component} from "react";
import CertAccordion from '../components/CertAccordion';
import LoadingSpinner from "../components/LoadingSpinner";
import { connect } from 'react-redux';
import { getCurriculum, openCert, openSection } from '../actions';

class Curriculum extends Component {
  componentDidMount() {
    this.props.fetchTheCurriculum();
  }

  render() {
    const { certificates } = this.props.curriculum;

    return (
      <main>
        <div className="row">
          <div className="col col--main">
            {certificates ? <CertAccordion certificates={certificates} handleCertClick={this.props.handleCertClick} handleSectionClick={this.props.handleSectionClick} /> : <LoadingSpinner />}
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

function mapStateToProps(state) {
  return {
    curriculum: state.certificates,
    errorMessage: state.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTheCurriculum: () => {
      dispatch(getCurriculum())
    },
    handleCertClick: (id) => {
      dispatch(openCert(id))
    },
    handleSectionClick: (id) => {
      dispatch(openSection(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Curriculum);
