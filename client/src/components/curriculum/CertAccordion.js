import React from 'react';
import Certificate from './Certificate';
import './CertAccordion.sass';

const CertAccordion = ({ certificates, handleCertClick, handleSectionClick, handleNewMessageClick, currentUser }) => (
    <div className="accordion">
        {certificates.map(cert => (
            <Certificate
                currentUser={currentUser}
                key={cert._id}
                cert={cert}
                handleCertClick={() => handleCertClick(cert._id)}
                handleSectionClick={handleSectionClick}
                handleNewMessageClick={handleNewMessageClick}
            />
        ))}
    </div>
);

export default CertAccordion;
