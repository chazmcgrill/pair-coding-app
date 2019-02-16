import { GET_LANGUAGES, GET_LANGUAGES_ERROR } from '../actions/types';

const INITIAL_STATE = {
    languages: [],
    errorMessage: '',
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_LANGUAGES:
            return { ...state, languages: action.payload };
        case GET_LANGUAGES_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}
