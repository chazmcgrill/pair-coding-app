import React from "react";
import LoginBox from './LoginBox'

const Modal = ({open, closeModal}) => (
    <div className="modal-bg">
        <LoginBox closeModal={closeModal} open={open}/>
    </div>
);

export default Modal;
