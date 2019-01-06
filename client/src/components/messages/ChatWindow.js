import React, { Component } from 'react';
import './ChatWindow.sass';
import Message from './Message';
import LoadingSpinner from '../LoadingSpinner';


class ChatWindow extends Component {
    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.chatRef.scrollTop = this.chatRef.scrollHeight - this.chatRef.clientHeight;
    }

    render() {
        const { isLoaded, messages, user } = this.props;

        return (
            <div className="chat-window">
                <div ref={el => this.chatRef = el} id="chat-window-messages" className="chat-window-messages">
                    {(isLoaded && messages) ? (
                        messages.message.map(item => (
                            <Message key={item.userId + item.message} loggedInUser={user} item={item} />
                        ))
                    ) : <LoadingSpinner />}
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
