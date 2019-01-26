import React from 'react';
import './Conversation.sass';
import Moment from 'react-moment';

const Conversation = ({ conversations, user, openMessage }) => (
    conversations.map(convo => (
        <article role="presentation" key={convo._id} className="inbox-article" onClick={() => openMessage(convo.roomId)}>
            {/* Filter out logged in user and map over the other. */}
            {convo.users
                .filter(author => author.userId !== user.githubId)
                .map(author => (
                    <div key={author.userId} className="inner-article">
                        <img className="inbox-avatar" src={author.avatar} alt="user avatar" />
                        <div className="inbox-details">
                            <div className="inbox-date-user">
                                <p className="inbox-text">{author.username}</p>
                                <p className="inbox-text">
                                    <Moment format="DD/MM/YYYY">
                                        {convo.updatedAt}
                                    </Moment>
                                </p>
                                <p className="inbox-text">
                                    <Moment format="HH:mm">
                                        {convo.updatedAt}
                                    </Moment>
                                </p>
                            </div>
                            <div className="last-message">
                                <p className="inbox-text">{ convo.lastMessage.length > 160 ? `${convo.lastMessage.substring(0, 160)} ...` : convo.lastMessage}</p>
                            </div>
                            <div className="user-status">
                                <p className="inbox-text">Online</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </article>
    ))
);

export default Conversation;
