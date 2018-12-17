import { GET_MESSAGES, GET_MESSAGES_ERROR } from '../actions/types';

const INITIAL_STATE = {
    messages: [],
    errorMessage: '',
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return { ...state, messages: action.payload };
        case GET_MESSAGES_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}