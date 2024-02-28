import axios from "axios";
import { API_BASE_URL, api } from "../../config/api";
import {
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "./auth.acctionType";

export const loginUser = (loginData) => async (dispatch) => {
  console.log(loginData);
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signin`,
      loginData.data
    );
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    console.log("register success", data);
    dispatch({ type: LOGIN_SUCCESS, payload: data.token });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};

export const registerUser = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      loginData.data
    );
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    console.log(data);
    dispatch({ type: LOGIN_SUCCESS, payload: data.token });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};

export const getProfile = (jwt) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_PROFILE_FAILURE, payload: error });
  }
};

export const updateProfile = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  try {
    const { data } = await api.put(`${API_BASE_URL}/api/users`, reqData);
    console.log(data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
  }
};

export const searchUser = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    const { data } = await api.get(`/api/users/search?query=${query}`);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: SEARCH_USER_FAILURE, payload: error });
  }
};


export const getUserbyId = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/users/${userId}`);
    dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USER_BY_ID_FAILURE, payload: error });
  }
};

export const followUser = (userId) => async (dispatch) => {
  dispatch({ type: FOLLOW_USER_REQUEST });
  try {
    const { data } = await api.put(`${API_BASE_URL}/api/users/follow/${userId}`);
    console.log(data);
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: FOLLOW_USER_FAILURE, payload: error });
  }
};

export const unFollowUser = (userId) => async (dispatch) => {
  dispatch({ type: UNFOLLOW_USER_REQUEST });
  try {
    const { data } = await api.put(`${API_BASE_URL}/api/users/unFollow/${userId}`);
    console.log(data);
    dispatch({ type: UNFOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: UNFOLLOW_USER_FAILURE, payload: error });
  }
};