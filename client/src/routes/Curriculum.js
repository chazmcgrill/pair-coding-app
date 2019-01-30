import React, { Component } from 'react';
import { connect } from 'react-redux';
import CertAccordion from '../components/curriculum/CertAccordion';
import LoadingSpinner from '../components/LoadingSpinner';
import {
    getCurriculum,
    openCert,
    openSection,
    sendNewMessage,
} from '../actions';
import requireAuth from './requireAuth';

class Curriculum extends Component {
    componentDidMount() {
        const { fetchTheCurriculum } = this.props;
        fetchTheCurriculum();
    }

    render() {
        const {
            curriculum,
            handleCertClick,
            handleSectionClick,
            handleNewMessageClick,
            user,
        } = this.props;
        const { certificates } = curriculum;

        return (
            <main>
                <div className="row">
                    <div className="col col--main">
                        {certificates ? <CertAccordion currentUser={user} certificates={certificates} handleCertClick={handleCertClick} handleSectionClick={handleSectionClick} handleNewMessageClick={handleNewMessageClick} /> : <LoadingSpinner />}
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
        );
    }
}

function mapStateToProps(state) {
    return {
        curriculum: state.certificates,
        errorMessage: state.errorMessage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTheCurriculum: () => {
            dispatch(getCurriculum());
        },
        handleCertClick: (id) => {
            dispatch(openCert(id));
        },
        handleSectionClick: (id) => {
            dispatch(openSection(id));
        },
        handleNewMessageClick: (id) => {
            dispatch(sendNewMessage(id));
        },
    };
}

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(Curriculum));
