import React, { Component } from 'react';
import './ChatInput.sass';
import io from 'socket.io-client';

const socket = io('localhost:5000');

class ChatInput extends Component {
    state = {
        message: '',
    }

    handleChange = (e) => {
        // Spread state into new variable
        const NS = { ...this.state };
        NS[e.name] = e.value;
        // Set state with new version of state
        this.setState(NS);
    };

    sendMessage = (e) => {
        e.preventDefault();
        const { room, user } = this.props;
        const { message } = this.state;
        socket.on(room).emit('SEND_MESSAGE', {
            user,
            message,
            room,
        });

        this.setState({ message: '' });
    }

    render() {
        const { message } = this.state;
        return (
            <div className="chat-input">
                <textarea
                    className="chat-input-field"
                    type="text"
                    name="message"
                    value={message}
                    onChange={e => this.handleChange(e.target)}
                />
                <button type="submit" onClick={this.sendMessage} className="chat-send">Send</button>
            </div>

        );
    }
}

export default ChatInput;
