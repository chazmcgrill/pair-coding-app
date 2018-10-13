import React from "react";
import Certificate from './Certificate';

const Certificates = ({ certificates, handleCertClick, handleSectionClick }) => (
    <div className="accordion">
        {console.log(certificates)}
        {certificates.map(c => (
            <Certificate 
                key={c._id} 
                cert={c} 
                handleCertClick={() => handleCertClick(c._id)} 
                handleSectionClick={handleSectionClick} 
            />
        ))}
    </div>
);

export default Certificates;
