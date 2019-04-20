import React, { Component } from 'react';
import './CertChallenge.sass';


class CertChallenge extends Component {
    state = {
        addedUsers: false,
    }

    addCurrentUserToCert = (currentUser) => {
        const { addedUsers } = this.state;

        if (!addedUsers) {
            this.addUserToDatabase(currentUser);
        }
        this.setState({ addedUsers: true });
    }

    addUserToDatabase = (currentUser) => {
        // Add Redux to update certificates -> sections -> users
    }

    render() {
        const {
            section,
            handleNewMessageClick,
            currentUser,
        } = this.props;

        const { addedUsers } = this.state;

        return (
            section.open && (
                <div className="cert-challenge">
                    <p>This section includes the challenges: </p>
                    <ul className="cert-challenge__list">
                        {section.list.map(item => (
                            <li className="cert-challenge__list-item" key={item}>{item}</li>
                        ))}
                    </ul>
                    <p>Want to pair-program with someone in this section? click the button to see who&lsquo;s studying.</p>
                    <button type="button" className="btn" onClick={() => this.addCurrentUserToCert(currentUser)}>Find a Partner</button>
                    {addedUsers && (
                        <button
                            type="button"
                            key={currentUser.githubId}
                            className="btn"
                        >
                            {`Message ${currentUser.name}`}
                        </button>
                    )
                    }
                    {section.users && section.users.map(user => (
                        <button type="button" key={user.userId} onClick={() => handleNewMessageClick({ receivingUser: user, sendingUser: currentUser })} className="btn">{`Message ${user.username}`}</button>
                    ))}
                </div>
            )
        );
    }
}

export default CertChallenge;
