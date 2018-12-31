import React from 'react';
import './Message.sass';

const Message = ({ item, loggedInUser }) => (
    <div className={(loggedInUser.githubId === item.userId) ? 'message-cloud logged-in-user' : 'message-cloud'}>
        <div className="message-cloud-user">
            <img className="inbox-avatar" src={item.avatar} alt="user avatar" />
            <p className="message-cloud-username">{item.username}</p>
        </div>
        <p className="message-cloud-message">{item.message}</p>
    </div>
);

export default Message;
