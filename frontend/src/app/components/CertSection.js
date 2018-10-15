import React from "react";
import CertChallenge from './CertChallenge';

function className(section) {
    return section.open ? 'accordion-cert__title colored' : 'accordion-cert__title'
}

const CertSection = ({ section, handleSectionClick }) => (
    <div className="accordion-section" key={section.name}>
        <p className={className(section)}  onClick={handleSectionClick}>&gt; &nbsp; {section.name}</p>
        <CertChallenge section={section}/>
    </div>
)

export default CertSection;
