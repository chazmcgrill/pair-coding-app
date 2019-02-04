import {
    GET_CERTS,
    GET_CERTS_ERROR,
    OPEN_CERT,
    OPEN_SECTION,
} from '../actions/types';

const INITIAL_STATE = {
    certificates: [],
    errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_CERTS:
            return { ...state, certificates: action.payload };
        case GET_CERTS_ERROR:
            return { ...state, errorMessage: action.payload };
        case OPEN_CERT:
            return Object.assign({}, state, {
                certificates: state.certificates.map(cert => (
                    { ...cert, open: !cert.open && cert._id === action.payload }
                )),
            });
        case OPEN_SECTION:
            return Object.assign({}, state, {
                certificates: state.certificates.map((cert) => {
                    const sections = cert.sections.map(section => ({
                        ...section,
                        open: !section.open && section._id === action.payload,
                    }));
                    return { ...cert, sections };
                }),
            });
        default:
            return state;
    }
}
