import React from 'react';
import './Message.sass';

const Message = ({ item }) => (
    <div className="message-cloud" key={item.userId + item.message}>
        <h3>{`User : ${item.username}`}</h3>
        <p>{`Message : ${item.message}`}</p>
    </div>
);

export default Message;
