import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleLoginModal } from '../actions';
import './Header.sass';

class NavBar extends Component {
    openModal = () => {
        const { loginClick } = this.props;
        loginClick();
    }

    render() {
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
                                <NavLink activeClassName="active" to="/inbox">Messages</NavLink>
                                <NavLink activeClassName="active" to="/Grid">Grid</NavLink>
                                <img className="nav-user-image" src={user.photo} alt="user avatar" />
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
