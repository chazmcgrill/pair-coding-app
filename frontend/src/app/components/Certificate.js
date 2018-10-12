import React from "react";
import CertSection from "./CertSection";

const Certificate = ({ cert, handleCertClick }) => (
    <div className="accordion-cert">
        <h4 className="accordion-cert__title" onClick={handleCertClick} >{cert.title}</h4>
        
        {cert.open ? cert.sections.map((s, i) => (
            <CertSection key={s + i} section={s} />
        )) : null}

    </div>
);

export default Certificate;
