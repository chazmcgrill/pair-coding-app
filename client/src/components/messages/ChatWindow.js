import React, { Component } from 'react';
import './ChatWindow.sass';
import io from 'socket.io-client';
import Message from './Message';
import ChatInput from './ChatInput';
import LoadingSpinner from '../LoadingSpinner';

const socket = io('localhost:5000');

class ChatWindow extends Component {
    state = {
        liveMessages: [],
        addedMessage: false,
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
        socket.on('RECEIVE_MESSAGE', (incomingMessage) => {
            const newState = { ...this.state };
            newState.liveMessages = [...liveMessages, incomingMessage];
            newState.addedMessage = true;
            this.setState(newState);
        });
    }


    scrollToBottom() {
        this.chatRef.scrollTop = this.chatRef.scrollHeight - this.chatRef.clientHeight;
    }

    render() {
        const {
            isLoaded,
            messages,
            user,
            room,
        } = this.props;

        const { liveMessages, addedMessage } = this.state;
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
                    {(addedMessage && liveMessages) ? (
                        liveMessages.map(liveMessage => (
                            <Message
                                key={liveMessage.userId + liveMessage.message}
                                loggedInUser={user}
                                item={liveMessage}
                            />
                        ))
                    ) : ''}
                </div>
                <ChatInput room={room} user={user} />
            </div>
        );
    }
}

export default ChatWindow;
