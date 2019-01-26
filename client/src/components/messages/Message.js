import React from 'react';
import './Message.sass';
import Moment from 'react-moment';

const Message = ({ item, loggedInUser }) => (
    <React.Fragment>
        <Moment format="D MMM HH:mm">
            {item.createdAt}
        </Moment>

        <div className={(loggedInUser.githubId === item.userId) ? 'message-cloud logged-in-user' : 'message-cloud'}>
            <div className="message-cloud-user">
                <img className="inbox-avatar" src={item.avatar} alt="user avatar" />
                <p className="message-cloud-username">{item.username}</p>
            </div>
            <p className="message-cloud-message">{item.message}</p>
        </div>
    </React.Fragment>
);

export default Message;
