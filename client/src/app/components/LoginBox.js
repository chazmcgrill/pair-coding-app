import React from 'react';
import './LoginBox.sass';
import GitHubLogo from '../../assets/images/github.svg';

const LoginBox = ({ closeModal, auth, disabled }) => (
    <div className="row row--centered">
        <div className="col col--center col--center__boxed text-center">
            <div className="modal">
                <span onClick={closeModal} className="modal__close">+</span>
                <div className="modal-top">
                    <h4>Log in</h4>
                    <hr />
                    <p>Log in using your GitHub Account.</p>
                    <button
                        type="button"
                        onClick={auth}
                        className={`btn btn--github btn--lg ${disabled}`}
                    >
                        <img src={GitHubLogo} alt="" />
                        Login With Github
                    </button>
                </div>
                <div className="modal-bottom">
                    <div>Not got an account? Sign up here.</div>
                </div>
            </div>
        </div>
    </div>
);

export default LoginBox;
