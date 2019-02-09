import React from 'react';
import { connect } from 'react-redux';
import { addNewUser } from '../../actions';
import requireAuth from '../../routes/requireAuth';
import './CertChallenge.sass';

const CertChallenge = ({
    section,
    handleNewMessageClick,
    currentUser,
    handleAddUserClick,
    addedUsers,
}) => (
    section.open && (
        <div className="cert-challenge">
            <p>This section includes the challenges: </p>
            <ul className="cert-challenge__list">
                {section.list.map(item => (
                    <li className="cert-challenge__list-item" key={item}>{item}</li>
                ))}
            </ul>
            <p>Want to pair-program with someone in this section? click the button to see who&lsquo;s studying.</p>
            <button type="button" className="btn" onClick={() => handleAddUserClick(currentUser)}>Find a Partner</button>
            {addedUsers.length > 0 && addedUsers.map(user => (
                <button
                    type="button"
                    key={user.githubId}
                    onClick={() => handleNewMessageClick({ receivingUser: user, sendingUser: currentUser })}
                    className="btn"
                >
                    {`Message ${user.name}`}
                </button>
            ))}
            {section.users && section.users.map(user => (
                <button type="button" key={user.userId} onClick={() => handleNewMessageClick({ receivingUser: user, sendingUser: currentUser })} className="btn">{`Message ${user.username}`}</button>
            ))}
        </div>
    )
);


const mapStateToProps = state => ({
    addedUsers: state.addUsers.addedUsers,
});

const mapDispatchToProps = dispatch => ({
    handleAddUserClick: user => dispatch(addNewUser(user)),
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(CertChallenge));
