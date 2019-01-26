import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getConversations } from '../actions';
import requireAuth from './requireAuth';
import Conversation from '../components/messages/Conversation';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

class Conversations extends Component {
    componentDidMount() {
        const { fetchConversations, user } = this.props;
        fetchConversations(user);
    }

    roomClick = (roomId) => {
        const { history } = this.props;
        history.push(`/inbox/messages/${roomId}`);
        // TODO
        // change unread to false if user isnt the one who created the last message
    }


    render() {
        const { conversations, user } = this.props;

        return (
            <main>
                <div className="row">
                    <div className="col col--main">
                        <div className="inbox-top-bar">
                            <select>
                                <option value="all">All Messages</option>
                                <option value="unread">Unread</option>
                            </select>
                            <Pagination />
                        </div>
                        <div className="conversations-container">

                            {/* If conversations have loaded create conversation
                                components, else display loading spinner */}

                            {conversations
                                ? (
                                    <Conversation
                                        openMessage={this.roomClick}
                                        user={user}
                                        conversations={conversations}
                                    />
                                ) : <LoadingSpinner />
                            }

                        </div>
                        <div className="inbox-bottom-bar">
                            <Pagination />
                        </div>
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

function mapStateToProps(state) {
    return {
        conversations: state.conversations.conversations,
        errorMessage: state.errorMessage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchConversations: (user) => {
            dispatch(getConversations(user));
        },
    };
}

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(Conversations));
