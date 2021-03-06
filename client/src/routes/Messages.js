import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages } from '../actions';
import requireAuth from './requireAuth';
import ChatWindow from '../components/messages/ChatWindow';

class Messages extends Component {
    state = {
        isLoaded: false,
    }

    componentDidMount() {
        const { fetchMessages, match } = this.props;
        const { roomId } = match.params;
        fetchMessages((roomId), this.updateLoaded());
    }

    updateLoaded = () => this.setState({ isLoaded: true })


    render() {
        const { messages, user, match } = this.props;
        const { isLoaded } = this.state;
        const { roomId } = match.params;

        return (
            <main>
                <div className="chat-row">

                    <div className="col col--main">
                        <ChatWindow messages={messages} room={roomId} user={user} isLoaded={isLoaded} />
                    </div>
                    <div className="col col--side">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat
                            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est laborum.
                            Donec elementum ligula eu sapien
                        </p>
                    </div>
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages.messages[0],
    errorMessage: state.errorMessage,
});

const mapDispatchToProps = dispatch => ({
    fetchMessages: roomId => dispatch(getMessages(roomId)),
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(Messages));
