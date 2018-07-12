import * as actionTypes from './actionTypes';
import axios from 'axios';

const APIKey = "AIzaSyBGPw3AGtZmEaTyy2GuTr5hjlHwlO_jDew";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBGPw3AGtZmEaTyy2GuTr5hjlHwlO_jDew' , authData)
            .then(res => {
              console.log(res);
              dispatch(authSuccess(res.data))
            })
            .catch(err =>{
                console.log(err);
                dispatch(authFailed(err))
            })

    }
};