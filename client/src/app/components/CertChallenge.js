import React from 'react';
import './CertChallenge.sass';

const CertChallenge = ({ section }) => {

    const dummyUsers = [
        {
            name: 'Charlie',
            id: 24394860,
        },
        {
            name: 'Middi',
            id: 15717148,
        },
        {
            name: 'midditest',
            id: 44947804,
        },
    ];

    const btn = user => (
        <button type="button" key={user.id}>
            Message
            {' '}
            {user.name}
        </button>
    );

    return (
        section.open ? (
            <div className="cert-challenge">
                <p>This section includes the challenges: </p>
                <ul className="cert-challenge__list">
                    {section.list.map((item, i) => (
                        <li className="cert-challenge__list-item" key={i}>{item}</li>
                    ))}
                </ul>
                <p>Want to pair-program with someone in this section? click the button to see who&lsquo;s studying.</p>
                <button type="button" className="btn">Find a Partner</button>

                {/* Static buttons for testing creating messages */
                    dummyUsers.map(user => (
                        <button type="button" key={user.id}>
                            {`Message ${user.name}`}
                        </button>
                    ))
                }
            </div>
        ) : null
    );
};

export default CertChallenge;
