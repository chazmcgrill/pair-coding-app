import React from "react";
import LoginBox from './LoginBox'

const Modal = ({open, closeModal, auth}) => (
    <div className="modal-bg">
        <LoginBox auth={auth} closeModal={closeModal} open={open}/>
    </div>
);

export default Modal;
