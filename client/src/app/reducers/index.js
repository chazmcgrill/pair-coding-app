import { combineReducers } from 'redux';
import certificates from './certificates';
import userProfile from './userProfile';
import conversations from './conversations';

export default combineReducers({
    certificates,
    userProfile,
    conversations
})