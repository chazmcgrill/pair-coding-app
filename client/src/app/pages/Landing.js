import React, { Component } from 'react';
import io from 'socket.io-client';
import Modal from '../components/Modal';
import { connect } from 'react-redux';
import { toggleLoginModal, addUser } from '../actions';

const API_URL = 'http://127.0.0.1:5000';
const socket = io(API_URL);

class Landing extends Component {
    state = {
        isModalOpen: false,
        user: {},
        disabled: false,
        popup: null
    }

    componentDidMount() {
        socket.on('github', user => {
            this.state.popup.close();
            this.props.addUser(user);
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

        return window.open(url, '', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no,  copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`)
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

    handleModalClick = () => {
        this.props.clickModalClose();
    }

    render() {
        const { disabled } = this.state;
        return (
            <div>
                <h1>Landing Page</h1>
                {this.props.isModalOpen &&
                    <Modal
                        auth={this.startAuth} 
                        disabled={disabled}
                        closeModal={this.handleModalClick}
                    />
                }
            </div>
        )
    }
}

function matchStateToProps(state) {
    return {
        isModalOpen: state.userProfile.isModalOpen
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clickModalClose: () => {
            dispatch(toggleLoginModal(false));
        },
        addUser: (user) => {
            dispatch(addUser(user));
        }
    }
}

export default connect(matchStateToProps, mapDispatchToProps)(Landing);