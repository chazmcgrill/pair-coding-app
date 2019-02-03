import React, { Fragment } from 'react';
import './LoginBox.sass';
import GitHubLogo from '../graphics/github.svg';

const LoginBox = ({ handleAuthButtonPress }) => (
    <Fragment>
        <div>
            <h4>Log in</h4>
            <hr />
            <p>Log in using your GitHub Account.</p>
            <button
                type="button"
                onClick={handleAuthButtonPress}
                className="btn btn--github btn--lg"
            >
                <img src={GitHubLogo} alt="" />
                Login With Github
            </button>
        </div>
        <div>
            <div>Not got an account? Sign up here.</div>
        </div>
    </Fragment>
);

export default LoginBox;
