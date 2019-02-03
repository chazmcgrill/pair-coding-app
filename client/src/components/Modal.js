import React from 'react';
import './Modal.sass';

const Modal = ({ closeModal, children }) => (
    <div className="modal-bg">
        <div className="row row--centered">
            <div className="col col--center col--center__boxed text-center">
                <div className="modal">
                    <span onClick={closeModal} className="modal__close">+</span>
                    {children}
                </div>
            </div>
        </div>
    </div>
);

export default Modal;
