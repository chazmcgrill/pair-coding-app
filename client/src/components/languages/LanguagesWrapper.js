import React from 'react';

const LanguagesWrapper = ({ languages }) => (
    <div>
        <h1>Languages</h1>
        {languages.languages.map(language => (
            <div key={language._id}>
                <p>{language.label}</p>
            </div>
        ))}
    </div>
);

export default LanguagesWrapper;
