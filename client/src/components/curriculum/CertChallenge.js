import React from 'react';
import './CertChallenge.sass';

const CertChallenge = ({ section, handleNewMessageClick, currentUser, handleAddUserClick }) => (
    section.open ? (
        <div className="cert-challenge">
            <p>This section includes the challenges: </p>
            <ul className="cert-challenge__list">
                {section.list.map((item, i) => (
                    <li className="cert-challenge__list-item" key={i}>{item}</li>
                ))}
            </ul>
            <p>Want to pair-program with someone in this section? click the button to see who&lsquo;s studying.</p>
            <button type="button" className="btn" onClick={() => handleAddUserClick(currentUser)}>Find a Partner</button>
            {
                section.users
                    ? section.users.map(user => (
                        <button type="button" key={user.userId} onClick={() => handleNewMessageClick({ recievingUser: user, sendingUser: currentUser })} className="btn">{`Message ${user.username}`}</button>
                    ))
                    : null
            }
        </div>
    ) : null
);

export default CertChallenge;
