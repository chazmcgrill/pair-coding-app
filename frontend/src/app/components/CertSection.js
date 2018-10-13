import React from "react";
import CertChallenge from './CertChallenge';

const CertSection = ({ section, handleSectionClick }) => (
    <div className="accordion-section" key={section.name}>
        <h4 className="accordion-section__title" onClick={handleSectionClick}>{section.name}</h4>
        <CertChallenge section={section}/>
    </div>
)

export default CertSection;
