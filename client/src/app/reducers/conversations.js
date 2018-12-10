import { GET_CONVERSATIONS, GET_CONVERSATIONS_ERROR } from '../actions/types';

const INITIAL_STATE = {
    conversations: [],
    errorMessage: '',
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_CONVERSATIONS:
            return { ...state, conversations: action.payload };
        case GET_CONVERSATIONS_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}