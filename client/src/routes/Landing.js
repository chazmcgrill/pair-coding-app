import React, { Component, Fragment } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Modal from '../components/Modal';
import Header from '../components/landingpage/Hero';
import { toggleLoginModal, addUser, findUser } from '../actions';
import Features from '../components/landingpage/Features';
import Reviews from '../components/landingpage/Reviews';

const API_URL = 'http://127.0.0.1:5000';
const socket = io(API_URL);

class Landing extends Component {
    state = {
        disabled: false,
        popup: null,
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            const { handleFindUser } = this.props;
            handleFindUser(token);
        } else {
            const { addsUser } = this.props;
            socket.on('github', (user) => {
                // eslint-disable-next-line
                this.state.popup.close();
                localStorage.setItem('token', user.githubId);
                addsUser(user);
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.check);
    }

    checkPopup = () => {
        this.check = setInterval(() => {
            const { popup } = this.state;
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(this.check);
                this.setState({ disabled: false });
            }
        }, 1000);
    }

    startAuth = () => {
        const { disabled } = this.state;
        if (!disabled) {
            this.checkPopup();
            this.setState({
                disabled: true,
                popup: this.openPopup(),
            });
        }
    }

    handleModalClick = () => {
        const { clickModalClose } = this.props;
        clickModalClose();
    }

    openPopup() {
        const width = 600;
        const height = 600;
        const left = (window.innerWidth / 2) - (width / 2);
        const top = (window.innerWidth / 2) - (height / 2);

        const url = `${API_URL}/api/auth?socket-id=${socket.id}`;

        return window.open(url, '', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no,  copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`);
    }

    render() {
        const { disabled } = this.state;
        const { isModalOpen } = this.props;
        return (
            <Fragment>
                <Header />
                <Features />
                <Reviews />

                {isModalOpen && (
                    <Modal
                        auth={this.startAuth}
                        disabled={disabled}
                        closeModal={this.handleModalClick}
                    />
                )}
            </Fragment>
        );
    }
}

function matchStateToProps(state) {
    return {
        isModalOpen: state.userProfile.isModalOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clickModalClose: () => {
            dispatch(toggleLoginModal(false));
        },
        addsUser: (user) => {
            dispatch(addUser(user));
        },
        handleFindUser: (token) => {
            dispatch(findUser(token));
        },
    };
}

export default connect(matchStateToProps, mapDispatchToProps)(Landing);
