import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actions-types";

const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    token
  }
};

const autoLogin = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logOut())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logOut());
      } else {
        dispatch(authSuccess(token));
        dispatch(autoLogOut((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
};

const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: AUTH_LOGOUT
  }
};

const autoLogOut = (time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logOut())
    }, time * 1000)
  }
};

const auth = (email, password, isLogin) => {
  return async (dispatch) => {
    const urlGlobal = 'https://identitytoolkit.googleapis.com/';
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    let url = `${urlGlobal}v1/accounts:signUp?key=AIzaSyATsgVFbGn2jZ7bViiZBJFTQc7jsap3jmg`;
    if (isLogin) {
      url = `${urlGlobal}v1/accounts:signInWithPassword?key=AIzaSyATsgVFbGn2jZ7bViiZBJFTQc7jsap3jmg`;
    }
    const response = await axios.post(url, authData);
    const data = response.data;
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogOut(data.expiresIn));
  }
};

export {
  auth,
  authSuccess,
  logOut,
  autoLogOut,
  autoLogin
};