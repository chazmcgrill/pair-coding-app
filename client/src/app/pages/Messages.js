import React, {Component} from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { connect } from 'react-redux';
import { getConversations } from '../actions';
import requireAuth from './requireAuth';

class Conversations extends Component {
  componentDidMount() {
    this.props.fetchConversations();
  }

  render() {
    const { conversations } = this.props.conversations;

    return (
      <main>
        
        <h1>Messages</h1>

         {conversations.map(convo => (
            <h3
                key={convo._id}>
                Room ID : {convo.roomId}
            </h3>
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
    fetchConversations: () => {
      dispatch(getConversations())
    }
  }
}

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(Conversations));
