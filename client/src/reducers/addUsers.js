import { ADD_NEW_USER_TO_CERT } from '../actions/types';

const INITIAL_STATE = { addedUsers: {}};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_NEW_USER_TO_CERT:
            console.log(action.payload)
            return { ...state, addedUsers: action.payload };
        default:
            return state;
    }
}
