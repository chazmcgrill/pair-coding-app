import React, { Component } from 'react';
import './ChatWindow.sass';
import io from 'socket.io-client';
import Message from './Message';
import ChatInput from './ChatInput';
import LoadingSpinner from '../LoadingSpinner';

const socket = io('localhost:5000');

class ChatWindow extends Component {
    componentDidMount() {
        this.online();
        this.receive();
    }


    componentDidUpdate() {
        this.scrollToBottom();
    }


    online = () => {
        const { user, room } = this.props;
        socket.emit('ONLINE', {
            user: user.githubId,
            room,
        });
    };

    receive = () => {
        socket.on('RECEIVE_MESSAGE', (data) => {
            console.log(data);
        });
    }

    post = (e) => {
        e.preventDefault();
        const { room } = this.props;
        socket.on(room).emit('SEND_MESSAGE', {
            message: 'some data here pal.',
            room,
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
