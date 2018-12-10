import { GET_CONVOS, GET_CONVOS_ERROR } from '../actions/types';

const INITIAL_STATE = {
    conversations: [],
    errorMessage: '',
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_CONVOS:
            return { ...state, conversations: action.payload };
        case GET_CONVOS_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}