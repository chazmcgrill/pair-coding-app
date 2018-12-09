import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { toggleLoginModal } from '../actions';
import './Header.sass';

class NavBar extends Component {
    openModal = () => {
        this.props.loginClick();
    }

    render() {
        const {user} = this.props;
        return (
            <header className="header" style={{ backgroundColor: '#fff' }}>
                <h3 className="header_logo">PEAR</h3>
                <nav className="nav">
                    <NavLink exact activeClassName="active" to="/">Home</NavLink>
                    <NavLink activeClassName="active" to="/curriculum">Curriculum</NavLink>
                    <NavLink activeClassName="active" to="/Grid">Grid</NavLink>
                    {user.photo ? <img className="nav-user-image" src={user.photo} alt="user avatar" /> : <div className="nav-link" onClick={this.openModal}>Login</div>}
                </nav>
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userProfile.user,
        modal: state.userProfile.isModalOpen
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginClick: () => {
            dispatch(toggleLoginModal(true));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
