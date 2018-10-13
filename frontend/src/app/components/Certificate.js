import React from "react";
import CertSection from "./CertSection";

const Certificate = ({ cert, handleCertClick, handleSectionClick }) => (
    <div className="accordion-cert">
        <h4 className="accordion-cert__title" onClick={handleCertClick} >{cert.title}</h4>
        
        {cert.open ? cert.sections.map(s => (
            <CertSection key={s._id} section={s} handleSectionClick={() => handleSectionClick(s._id)} />
        )) : null}

    </div>
);

export default Certificate;
