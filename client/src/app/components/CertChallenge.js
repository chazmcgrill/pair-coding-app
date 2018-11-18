import React from "react";
import './CertChallenge.sass';

const CertChallenge = ({ section }) => (
    section.open ? 
        <div className="cert-challenge">
            <p>This section includes the challenges: </p>
            <ul className="cert-challenge__list">
                {section.list.map((item, i) => (
                    <li className="cert-challenge__list-item" key={i}>{item}</li>
                ))}
            </ul>
            <p>Want to pair-program with someone in this section? click the button to see who's studying.</p>
            <button className="btn">Find a Partner</button>
        </div>
    : null
)

export default CertChallenge;
