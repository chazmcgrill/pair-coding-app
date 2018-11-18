import React from "react";
import CertChallenge from './CertChallenge';
import './CertSection.sass';

const CertSection = ({ section, handleSectionClick }) => (
    <div className="accordion-section" key={section.name}>
        <p className={`accordion-cert__title ${section.open ? 'is-colored' : ''}`} onClick={handleSectionClick}>&gt; &nbsp; {section.name}</p>
        <CertChallenge section={section}/>
    </div>
)

export default CertSection;
