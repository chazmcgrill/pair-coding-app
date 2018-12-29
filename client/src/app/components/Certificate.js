import React from 'react';
import CertSection from './CertSection';
import './Certificate.sass';

const Certificate = ({ cert, handleCertClick, handleSectionClick }) => (
    <div className="accordion-cert">
        <p className={`accordion-cert__title ${cert.open ? 'is-colored' : ''}`} onClick={handleCertClick}>{cert.title}</p>
        {cert.open ? cert.sections.map(section => (
            <CertSection key={section._id} section={section} handleSectionClick={() => handleSectionClick(section._id)} />
        )) : null}

    </div>
);

export default Certificate;
