import React from "react";

const CertSection = ({ section, handleSectionClick }) => (
    <div className="accordion-section" key={section.name}>
        <h4 className="accordion-section__title" onClick={handleSectionClick}>{section.name}</h4>
        { section.open ? 
            <ul className="accordion-list">
                {section.list.map((l, i) => (
                    <li className="accordion-list__item" key={i}>{l}</li>
                ))}
            </ul> : null }
    </div>
)

export default CertSection;
