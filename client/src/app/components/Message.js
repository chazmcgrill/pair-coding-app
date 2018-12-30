import React from 'react';
import './Message.sass';

const Message = ({ item }) => (
    <div className="message-cloud" key={item.userId + item.message}>
        <img className="inbox-avatar" src={item.avatar} alt="user avatar" />
        <p>{item.username}</p>
        <p>{item.message}</p>
    </div>
);

export default Message;
