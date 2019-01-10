import React, { Component } from 'react';
import './ChatInput.sass';
import io from 'socket.io-client';

const socket = io('localhost:5000');

class ChatInput extends Component {
    post = (e) => {
        e.preventDefault();
        const { room } = this.props;
        socket.on(room).emit('SEND_MESSAGE', {
            message: 'some data here pal.',
            room,
        });
    }

    render() {
        return (
            <div className="chat-input">
                <textarea className="chat-input-field" type="text" />
                <button type="submit" onClick={this.post} className="chat-send">Send</button>
            </div>

        );
    }
}

export default ChatInput;
