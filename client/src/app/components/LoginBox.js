import React from "react";
import GitHubLogo from '../../assets/images/github.svg';

const LoginBox = ({open, closeModal}) => (
    <div className="row row--centered">
        <div className="col col--center col--center__boxed text-center">

            {open && <span onClick={closeModal} className="modal-close">+</span>}

            <div className="internal-flex-modal">
                <div className="modal-top">
                    <h4>Log in</h4>
                    <hr />
                    <p>Log in using your GitHub Account.</p>
                    <button className="btn btn--github btn--lg">
                        <img src={GitHubLogo} alt=""/>Login With Github
                    </button>
                </div>
                <div className="modal-bottom">
                    <a>Not got an account? Sign up here.</a>
                </div>
            </div>
        </div>
    </div>
);

export default LoginBox;
