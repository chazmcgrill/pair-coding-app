import React from 'react';
import '@mdi/font/css/materialdesignicons.css';
import './Languages.sass';

// test

const Languages = ({ languages }) => (
    <div className="row">
        <div className="languages-wrapper">
            {languages.languages.map(language => (
                <div className="language-box" key={language._id}>
                    <span className={`language-icon mdi mdi-${language.icon}`} />
                    <p>{language.label}</p>
                </div>
            ))}
        </div>
    </div>
);

export default Languages;
