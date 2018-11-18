import React from "react";
import LoginBox from './LoginBox';
import './Modal.sass';

const Modal = ({closeModal, auth, disabled}) => (
    <div className="modal-bg">
        <LoginBox auth={auth} 
        disabled={disabled} closeModal={closeModal} />
    </div>
);

export default Modal;
