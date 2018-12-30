import React from 'react';
import './ChatWindow.sass';
import Message from './Message';
import LoadingSpinner from './LoadingSpinner';

const ChatWindow = ({ messages, isLoaded }) => (
    <div className="chat-window">
        <div className="chat-window-messages">
            {(isLoaded && messages)
                ? (messages.message.map(item => (
                    <Message item={item} />
                ))
                ) : <LoadingSpinner />
            }
        </div>
        <div className="chat-input">
            <input className="chat-input-field" type="text" />
            <button type="submit" className="chat-send">Send</button>
        </div>
    </div>
);

export default ChatWindow;
