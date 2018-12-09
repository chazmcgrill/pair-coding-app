import { combineReducers } from 'redux';
import certificates from './certificates';
import userProfile from './userProfile';

export default combineReducers({
    certificates,
    userProfile
})