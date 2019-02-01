import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { toggleLoginModal, removeUser } from '../actions';
import './Header.sass';

const socket = io('localhost:5000');

class NavBar extends Component {
    state = {
        userMenuOpen: false,
    }

    componentDidUpdate() {
        this.newMessage();
    }

    newMessage = () => {
        socket.on('RECEIVE_NOTIFICATION', (incomingMessage) => {
            console.log('somethings coming in');
        });
    }

    openModal = () => {
        const { loginClick } = this.props;
        loginClick();
    }

    openUserMenu = () => {
        const { userMenuOpen } = this.state;
        this.setState({ userMenuOpen: !userMenuOpen });
    }

    handleLogoutClick = () => {
        const { handleRemoveUser } = this.props;
        localStorage.removeItem('token');
        handleRemoveUser();
    }

    render() {
        const { userMenuOpen } = this.state;
        const { user } = this.props;
        return (
            <header className="header" style={{ backgroundColor: 'none' }}>
                <div className="header-wrapper">
                    <div className="header-left-side">
                        <h3 className="header_logo">PEAR</h3>
                        {!user.photo && (
                            <Fragment>
                                <a className="nav-link-left" href="#features">Features</a>
                                <a className="nav-link-left" href="#reviews">Reviews</a>
                            </Fragment>
                        )}
                    </div>
                    <nav className="nav">
                        {!user.photo ? (
                            <Fragment>
                                <div role="button" tabIndex={0} className="nav-link" onClick={this.openModal}>Signup</div>
                                <div role="button" tabIndex={0} className="nav-link" onClick={this.openModal}>Login</div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <NavLink exact activeClassName="active" to="/">Home</NavLink>
                                <NavLink activeClassName="active" to="/curriculum">Curriculum</NavLink>
                                <NavLink activeClassName="active" to="/inbox">Inbox</NavLink>
                                <NavLink activeClassName="active" to="/Grid">Grid</NavLink>
                                <img
                                    onClick={this.openUserMenu}
                                    className="nav-user-image"
                                    src={user.photo}
                                    alt="user avatar"
                                />
                                {userMenuOpen && (
                                    <div className="nav-user-menu">
                                        <span onClick={this.handleLogoutClick} className="nav-user-menu--button">Logout</span>
                                    </div>
                                )}
                            </Fragment>
                        )}
                    </nav>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userProfile.user,
        modal: state.userProfile.isModalOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginClick: () => {
            dispatch(toggleLoginModal(true));
        },
        handleRemoveUser: () => {
            dispatch(removeUser());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
