import {
    ADD_USER,
    FIND_USER,
    REMOVE_USER,
    FIND_USER_ERROR,
    TOGGLE_LOGIN_MODAL,
} from '../actions/types';

const INITIAL_STATE = {
    user: {},
    isModalOpen: false,
    errorMessage: false,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_USER:
            return { ...state, user: action.payload, isModalOpen: false };
        case FIND_USER:
            return { ...state, user: action.payload };
        case FIND_USER_ERROR:
            return { ...state, errorMessage: action.payload };
        case REMOVE_USER:
            return { ...state, user: {} };
        case TOGGLE_LOGIN_MODAL:
            return { ...state, isModalOpen: action.payload };
        default:
            return state;
    }
}
