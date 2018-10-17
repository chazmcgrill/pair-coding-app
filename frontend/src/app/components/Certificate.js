import React from "react";
import CertSection from "./CertSection";

function className(cert) {
    return cert.open ? 'accordion-cert__title colored' : 'accordion-cert__title'
}

const Certificate = ({ cert, handleCertClick, handleSectionClick }) => (
    <div className="accordion-cert">
    <p className={className(cert)} onClick={handleCertClick} >{cert.title}</p>
        
        {cert.open ? cert.sections.map(section => (
            <CertSection key={section._id} section={section} handleSectionClick={() => handleSectionClick(section._id)} />
        )) : null}

    </div>
);

export default Certificate;
