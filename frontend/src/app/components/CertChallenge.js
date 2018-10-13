import React from "react";

const CertChallenge = ({ section }) => (
    section.open ? 
        <ul className="accordion-list">
            {section.list.map((item, i) => (
                <li className="accordion-list__item" key={i}>{item}</li>
            ))}
        </ul> : null
)

export default CertChallenge;
