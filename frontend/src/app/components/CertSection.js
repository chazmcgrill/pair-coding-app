import React from "react";
import CertChallenge from './CertChallenge';

const CertSection = ({ section, handleSectionClick }) => (
    <div className="accordion-section" key={section.name}>
        <p className="accordion-cert__title" onClick={handleSectionClick}>&gt; &nbsp; {section.name}</p>
        <CertChallenge section={section}/>
    </div>
)

export default CertSection;
