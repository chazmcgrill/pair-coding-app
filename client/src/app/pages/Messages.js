import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import { getConversations } from '../actions';
import requireAuth from './requireAuth';

class Conversations extends Component {
  componentDidMount() {
    this.props.fetchConversations(this.props.user);
  }

  render() {
    const { conversations } = this.props.conversations;

    return (
      <main>
        
        <h1>Messages</h1>

         {conversations.map(convo => (
             <Fragment>
            <h3
                key={convo._id}>
                Room ID : {convo.roomId}
            </h3>
            <p>Users: {convo.users.join(', ')}</p>
            </Fragment>
        ))}
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    conversations: state.conversations,
    errorMessage: state.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchConversations: (user) => {
      dispatch(getConversations(user))
    }
  }
}

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(Conversations));
