import React from "react";
import CertSection from "./CertSection";

const Certificate = ({ cert, handleCertClick, handleSectionClick }) => (
    <div className="accordion-cert">
        <h4 className="accordion-cert__title" onClick={handleCertClick} >{cert.title}</h4>
        
        {cert.open ? cert.sections.map(section => (
            <CertSection key={section._id} section={section} handleSectionClick={() => handleSectionClick(section._id)} />
        )) : null}

    </div>
);

export default Certificate;
