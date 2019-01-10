import React, { Component } from 'react';
import './ChatWindow.sass';
import io from 'socket.io-client';
import Message from './Message';
import ChatInput from './ChatInput';
import LoadingSpinner from '../LoadingSpinner';

const socket = io('localhost:5000');

class ChatWindow extends Component {
    state = {
        liveMessages: [
            {
                message: 'hello',
                user: {
                    name: 'someuser',
                },
            },
        ],
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
        const { liveMessages } = this.state;
        socket.on('RECEIVE_MESSAGE', (data) => {
            const message = {
                message: data.message,
                user: data.user,
            };
            const newState = { ...this.state };
            newState.liveMessages = [...liveMessages, message];
            this.setState(newState);
        });
    }


    scrollToBottom() {
        this.chatRef.scrollTop = this.chatRef.scrollHeight - this.chatRef.clientHeight;
    }

    render() {
        const { isLoaded, messages, user } = this.props;

        const { liveMessages } = this.state;
        return (
            <div className="chat-window">
                <div ref={el => this.chatRef = el} id="chat-window-messages" className="chat-window-messages">
                    {(isLoaded && messages) ? (
                        messages.message.map(item => (
                            <Message
                                key={item.userId + item.message}
                                loggedInUser={user}
                                item={item}
                            />
                        ))
                    ) : <LoadingSpinner />}
                    {liveMessages && (
                        liveMessages.map(liveMessage => (
                            <div>
                                <p>{liveMessage.message}</p>
                                <p>{liveMessage.user.name}</p>
                            </div>
                        ))
                    )}
                </div>
                <ChatInput user={user} />
            </div>
        );
    }
}

export default ChatWindow;
