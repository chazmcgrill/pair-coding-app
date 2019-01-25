import React, { Component } from 'react';
import './ChatInput.sass';
import io from 'socket.io-client';

const socket = io('localhost:5000');

class ChatInput extends Component {
    state = {
        message: '',
        username: '',
        userId: '',
        avatar: '',
    };

    componentDidMount = () => {
        const { user } = this.props;
        const NS = { ...this.state };
        NS.username = user.name;
        NS.userId = user.githubId;
        NS.avatar = user.photo;
        this.setState(NS);
    }

    handleChange = (e) => {
        const { name, value } = e;
        this.setState({ [name]: value });
    };

    sendMessage = (e) => {
        e.preventDefault();
        const { room } = this.props;
        const {
            message,
            username,
            userId,
            avatar,
        } = this.state;

        socket.on(room).emit('SEND_MESSAGE', {
            username,
            userId,
            avatar,
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
