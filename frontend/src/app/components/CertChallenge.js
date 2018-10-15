import React from "react";

const CertChallenge = ({ section }) => (
    section.open ? 
        <div className="accordion-cert__challenge">
            <p>This section includes the challenges: </p>
            <ul className="accordion-list">
                {section.list.map((item, i) => (
                    <li className="accordion-list__item" key={i}>{item}</li>
                ))}
            </ul>
            <p>Want to pair-program with someone in this section? click the button to see who's studying.</p>
            <button className="btn">Find a Partiner</button>
        </div>
    : null
)

export default CertChallenge;
