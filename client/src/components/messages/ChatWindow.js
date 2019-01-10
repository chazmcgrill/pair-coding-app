import React, { Component } from 'react';
import './ChatWindow.sass';
import io from 'socket.io-client';
import Message from './Message';
import ChatInput from './ChatInput';
import LoadingSpinner from '../LoadingSpinner';

const socket = io('localhost:5000');

class ChatWindow extends Component {
    state = {
        messages: [],
    }

    componentDidMount() {
        this.online();
    }

    componentDidUpdate() {
        this.scrollToBottom();
        this.receiveMessage();
    }

    online = () => {
        const { user, room } = this.props;
        socket.emit('ONLINE', {
            user: user.githubId,
            room,
        });
    };

    receiveMessage = () => {
        const { messages } = this.state;
        socket.on('RECEIVE_MESSAGE', (data) => {
            this.setState({ messages: [...messages, data.message] });
        });
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
                <ChatInput />
            </div>
        );
    }
}

export default ChatWindow;
