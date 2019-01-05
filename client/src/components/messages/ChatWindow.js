import React, { Component } from 'react';
import './ChatWindow.sass';
import Message from './Message';
import LoadingSpinner from '../LoadingSpinner';


class ChatWindow extends Component {
    state = {}

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        const { chatWindow } = this.refs;
        chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
    }

    render() {
        const { isLoaded, messages, user } = this.props;

        return (
            <div className="chat-window">
                <div ref="chatWindow" id="chat-window-messages" className="chat-window-messages">
                    {(isLoaded && messages)
                        ? (messages.message.map(item => (
                            <Message key={item.userId + item.message} loggedInUser={user} item={item} />
                        ))
                        ) : <LoadingSpinner />
                    }
                </div>
                <div className="chat-input">
                    <textarea className="chat-input-field" type="text" />
                    <button type="submit" className="chat-send">Send</button>
                </div>
            </div>
        );
    }
}

export default ChatWindow;
