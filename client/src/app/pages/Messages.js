import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getMessages } from '../actions';
import requireAuth from './requireAuth';

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
        const { messages } = this.props;
        const { isLoaded } = this.state;

        return (
            <main>
                <div className="chat-window">
                    {isLoaded && messages[0] ? (
                        messages[0].message.map(item => (

                            <Fragment key={item.userId + item.message}>
                                <h3>{`User : ${item.username}`}</h3>
                                <p>{`Message : ${item.message}`}</p>
                            </Fragment>
                        ))
                    ) : 'Loading'}
                </div>
                <div className="chat-input-field" />
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        messages: state.messages.messages,
        errorMessage: state.errorMessage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMessages: (roomId) => {
            dispatch(getMessages(roomId));
        },
    };
}

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(Messages));
