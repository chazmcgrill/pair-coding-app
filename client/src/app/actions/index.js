import axios from 'axios';
import { GET_CERTS, GET_CERTS_ERROR, OPEN_CERT, OPEN_SECTION } from './types';

export const getCurriculum = (callback) => async dispatch => {
    try {
        const response = await axios.get('http://localhost:5000/api/subjects');
        dispatch({ type: GET_CERTS, payload: response.data });
        callback();
    } catch (e) {
        dispatch({ type: GET_CERTS_ERROR, payload: 'Error Fetching Data' })
    }
};

export const openCert = (id) => dispatch => {
    dispatch({ type: OPEN_CERT, payload: id });
}

export const openSection = (id) => dispatch => {
    dispatch({ type: OPEN_SECTION, payload: id });
}
