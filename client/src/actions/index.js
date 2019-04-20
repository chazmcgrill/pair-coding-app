import axios from 'axios';
import io from 'socket.io-client';

import {
    GET_CERTS,
    GET_CERTS_ERROR,
    OPEN_CERT,
    OPEN_SECTION,
    SEND_NEW_USER_ERROR,
    ADD_USER,
    REMOVE_USER,
    FIND_USER,
    FIND_USER_ERROR,
    TOGGLE_LOGIN_MODAL,
    GET_CONVERSATIONS,
    GET_CONVERSATIONS_ERROR,
    GET_MESSAGES,
    GET_MESSAGES_ERROR,
    SEND_NEW_MESSAGE,
    SEND_NEW_MESSAGE_ERROR,
    GET_LANGUAGES,
    GET_LANGUAGES_ERROR,
} from './types';


const socket = io('localhost:5000');

// Curriculum Actions
export const getCurriculum = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/api/subjects');
        dispatch({ type: GET_CERTS, payload: response.data });
    } catch (e) {
        dispatch({ type: GET_CERTS_ERROR, payload: 'Error Fetching Data' });
    }
};

export const addNewUser = user => async (dispatch) => {
    try {
        console.log(user);
    } catch (e) {
        dispatch({ type: SEND_NEW_USER_ERROR, payload: 'Error adding new user to curriculum section.' });
    }
};

// Inbox Actions
export const getConversations = user => async (dispatch) => {
    try {
        const userId = user.githubId;
        const response = await axios({
            method: 'get',
            url: 'http://localhost:5000/api/conversations',
            params: {
                ID: userId,
            },
        });
        dispatch({ type: GET_CONVERSATIONS, payload: response.data });
    } catch (e) {
        dispatch({ type: GET_CONVERSATIONS_ERROR, payload: 'Error Fetching Data' });
    }
};

// Messages Actions
export const getMessages = roomId => async (dispatch) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:5000/api/messages',
            params: {
                ID: roomId,
            },
        });
        dispatch({ type: GET_MESSAGES, payload: response.data });
    } catch (e) {
        dispatch({ type: GET_MESSAGES_ERROR, payload: 'Error Fetching Data' });
    }
};

export const sendNewMessage = userData => async (dispatch) => {
    try {
        console.log(userData)
        const { receivingUser, sendingUser } = userData;
        // Make room Id from two users, sort the id's then flatten.
        const roomId = [receivingUser.userId, sendingUser.githubId].sort().join('');
  
        socket.on(roomId).emit('MAKE_CONVERSATION', {
            roomId,
            receivingUser,
            sendingUser,
        });
        dispatch({ type: SEND_NEW_MESSAGE, payload: 'Message Saved' });
    } catch (e) {
        dispatch({ type: SEND_NEW_MESSAGE_ERROR, payload: 'Error Sending Message' });
    }
};

export const openCert = id => (dispatch) => {
    dispatch({ type: OPEN_CERT, payload: id });
};

export const openSection = id => (dispatch) => {
    dispatch({ type: OPEN_SECTION, payload: id });
};

export const addUser = user => (dispatch) => {
    dispatch({ type: ADD_USER, payload: user });
};

export const findUser = token => async (dispatch) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:5000/api/auth/find-user',
            params: { token },
        });
        dispatch({ type: FIND_USER, payload: response.data });
    } catch (e) {
        dispatch({
            type: FIND_USER_ERROR,
            payload: 'Error Fetching Data',
        });
    }
};

export const removeUser = () => (dispatch) => {
    dispatch({ type: REMOVE_USER });
};

export const toggleLoginModal = isOpen => (dispatch) => {
    dispatch({ type: TOGGLE_LOGIN_MODAL, payload: isOpen });
};

export const getLanguages = () => async (dispatch) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:5000/api/languages',
        });
        dispatch({ type: GET_LANGUAGES, payload: response.data });
    } catch (e) {
        dispatch({
            type: GET_LANGUAGES_ERROR,
            payload: 'Error Fetching Data',
        });
    }
};
