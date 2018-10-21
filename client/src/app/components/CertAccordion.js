import React from "react";
import Certificate from './Certificate';

const CertAccordion = ({ certificates, handleCertClick, handleSectionClick }) => (
    <div className="accordion">
        {certificates.map(cert => (
            <Certificate 
                key={cert._id} 
                cert={cert} 
                handleCertClick={() => handleCertClick(cert._id)} 
                handleSectionClick={handleSectionClick} 
            />
        ))}
    </div>
);

export default CertAccordion;
