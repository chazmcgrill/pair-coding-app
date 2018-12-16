import axios from 'axios';
import { GET_CERTS, GET_CERTS_ERROR, OPEN_CERT, OPEN_SECTION, ADD_USER, TOGGLE_LOGIN_MODAL, GET_CONVERSATIONS, GET_CONVERSATIONS_ERROR } from './types';

// Curriculum Actions
export const getCurriculum = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:5000/api/subjects');
        dispatch({ type: GET_CERTS, payload: response.data });
    } catch (e) {
        dispatch({ type: GET_CERTS_ERROR, payload: 'Error Fetching Data' })
    }
};

// Messages Actions
export const getConversations = (id) => async dispatch => {
    try {
        const userId = id.githubId;
        const response = await axios({
            method: 'get',
            url: 'http://localhost:5000/api/conversations',
            params: {
                ID: userId
            }
        })
        dispatch({ type: GET_CONVERSATIONS, payload: response.data });
    } catch (e) {
        dispatch({ type: GET_CONVERSATIONS_ERROR, payload: 'Error Fetching Data' })
    }
};

export const openCert = (id) => dispatch => {
    dispatch({ type: OPEN_CERT, payload: id });
}

export const openSection = (id) => dispatch => {
    dispatch({ type: OPEN_SECTION, payload: id });
}

export const addUser = (user) => dispatch => {
    dispatch({ type: ADD_USER, payload: user });
}

export const toggleLoginModal = (isOpen) => dispatch => {
    dispatch({ type: TOGGLE_LOGIN_MODAL, payload: isOpen });
}
