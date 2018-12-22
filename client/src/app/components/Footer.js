import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleLoginModal } from '../actions';
import './Footer.sass';

class Footer extends Component {
    openModal = () => {
        const { loginClick } = this.props;
        loginClick();
    }

    render() {
        const { user } = this.props;

        return (
            <div className="footer" style={{ padding: user.photo ? '18px 20px' : '50px 20px' }}>
                <div className="footer-container">
                    <div id="logo" className="logo">
                        <h3 className="footer-logo">PEAR</h3>
                    </div>
                    <nav className="footer-nav">
                        {!user.photo ? (
                            <Fragment>
                                <a className="nav-link-left" href="#features">Features</a>
                                <a className="nav-link-left" href="#reviews">Reviews</a>
                                <div role="button" tabIndex={0} className="nav-link" onClick={this.openModal}>Signup</div>
                                <div role="button" tabIndex={0} className="nav-link" onClick={this.openModal}>Login</div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <NavLink exact activeClassName="active" to="/">Home</NavLink>
                                <NavLink activeClassName="active" to="/curriculum">Curriculum</NavLink>
                                <NavLink activeClassName="active" to="/messages">Messages</NavLink>
                                <NavLink activeClassName="active" to="/Grid">Grid</NavLink>
                            </Fragment>
                        )}
                    </nav>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
