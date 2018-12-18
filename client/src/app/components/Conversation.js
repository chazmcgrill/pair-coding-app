import React from "react";
import './Conversation.sass';

const Conversation = ({ conversations, user, openMessage }) => (
    conversations.map(convo => (
        <article className="inbox-article" onClick={() => openMessage(convo.roomId)}>
            {/* Filter out logged in user and map over the other. */}
            {convo.users
                .filter(author => author.username !== user.name)
                .map(author => (
                    <div className="inner-article">
                        <img className="inbox-avatar" src={author.avatar} alt="user image" />
                        <div className="inbox-details">
                            <h3>{author.username}</h3>
                        </div>
                    </div>
                ))
            }
        </article>
    ))
)

export default Conversation;
