import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import { getMessages } from '../actions';
import requireAuth from './requireAuth';

class Messages extends Component {

  state= {
    isLoaded: false
  }

  componentDidMount() {
    const roomId = this.props.match.params.roomId;
    
    this.props.fetchMessages((roomId), this.updateLoaded());
    
    
  }

  updateLoaded = () => this.setState({ isLoaded: true })

  
  render() {
    const { messages } = this.props.messages;
    
    return (
      <main>
   
        <h1>Messages</h1>

      
         { this.state.isLoaded ? (
           messages[0].message.map(item => (

             <Fragment>
              <h3>
                  User : {item.user}
              </h3>
              <p>message: {item.message}</p>
            </Fragment>
        ))
         ): 'Loading'}
         
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    errorMessage: state.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMessages: (roomId) => {
      dispatch(getMessages(roomId))
    }
  }
}

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(Messages));
