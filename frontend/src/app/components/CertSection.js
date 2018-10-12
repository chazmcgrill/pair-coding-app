import React from "react";

const CertSection = ({ section }) => (
    <div className="accordion-section" key={section.name}>
        <h4 className="accordion-section__title">{section.name}</h4>
        <ul className="accordion-list">
            {section.list.map((l, i) => (
                <li className="accordion-list__item" key={i}>{l}</li>
            ))}
        </ul>
    </div>
)

export default CertSection;
