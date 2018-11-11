import React from "react";
import LoginBox from './LoginBox'

const Modal = ({open, closeModal, auth, disabled}) => (
    <div className="modal-bg">
        <LoginBox auth={auth} 
        disabled={disabled} closeModal={closeModal} open={open}/>
    </div>
);

export default Modal;
