import { combineReducers } from 'redux';
import certificates from './certificates';
import userProfile from './userProfile';
import conversations from './conversations';
import messages from './messages';
import languages from './languages';

export default combineReducers({
    certificates,
    userProfile,
    conversations,
    messages,
    languages,
});
