import { ADD_NEW_USER_TO_CERT, ADD_NEW_USER_TO_CERT_ERROR } from '../actions/types';

const INITIAL_STATE = {
    addedUsers: [],
    errorMessage: '',
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_NEW_USER_TO_CERT:
            return { ...state, addedUsers: [...state.addedUsers, action.payload] };
        case ADD_NEW_USER_TO_CERT_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}
