import axios from "axios"
import { API_BASE_URL, api } from "../../config/api"
import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.acctionType";

export const loginUser = (loginData) => async(dispatch) => {
    console.log(loginData);
    dispatch({type: LOGIN_REQUEST,});
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data);
        if(data.token) {
            localStorage.setItem("token", data.token);
        }
        console.log("register success", data);
        dispatch({type: LOGIN_SUCCESS, payload: data.token});
    } catch (error) {
        console.log(error);
        dispatch({type: LOGIN_FAILURE, payload: error});
    }

}


export const registerUser = (loginData) => async(dispatch) => {
    dispatch({type: LOGIN_REQUEST,});
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`, loginData.data);
        if(data.token) {
            localStorage.setItem("token", data.token);
        }
        console.log(data);
        dispatch({type: LOGIN_SUCCESS, payload: data.token});
    } catch (error) {
        console.log(error);
        dispatch({type: LOGIN_FAILURE, payload: error});
    }

}


export const getProfile = (jwt) => async(dispatch) => {
    dispatch({type: GET_PROFILE_REQUEST,});
    try {
        const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({type: GET_PROFILE_SUCCESS, payload: data});
    } catch (error) {
        console.log(error);
        dispatch({type: GET_PROFILE_FAILURE, payload: error});
    }

}



export const updateProfile = (reqData) => async(dispatch) => {
    dispatch({type: UPDATE_PROFILE_REQUEST,});
    try {
        const {data} = await api.put(`${API_BASE_URL}/api/users`, reqData);
        console.log(data);
        dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data});
    } catch (error) {
        console.log(error);
        dispatch({type: UPDATE_PROFILE_FAILURE, payload: error});
    }
}
