import React from 'react';
import CertChallenge from './CertChallenge';
import './CertSection.sass';

const CertSection = ({ section, handleSectionClick, handleNewMessageClick, currentUser }) => (
    <div className="accordion-section" key={section.name}>
        <p className={`accordion-cert__title ${section.open ? 'is-colored' : ''}`} onClick={handleSectionClick}>
            &gt; &nbsp;
            {section.name}
        </p>
        <CertChallenge currentUser={currentUser} section={section} handleNewMessageClick={handleNewMessageClick} />
    </div>
);

export default CertSection;
