import { ADD_USER, TOGGLE_LOGIN_MODAL } from '../actions/types';

const INITIAL_STATE = {
    user: {},
    isModalOpen: false,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_USER:
            return { ...state, user: action.payload, isModalOpen: false };
        case TOGGLE_LOGIN_MODAL:
            return { ...state, isModalOpen: action.payload };
        default:
            return state;
    }
}
