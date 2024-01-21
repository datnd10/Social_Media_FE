import axios from "axios"
import { API_BASE_URL } from "../../config/api"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./auth.acctionType";

export const loginUser = (loginData) => async(dispatch) => {
    dispatch({type: LOGIN_REQUEST,});
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data);

        if(data.jwt) {
            localStorage.setItem("token", data.jwt);
        }
        console.log("register success", data);
        dispatch({type: LOGIN_SUCCESS, payload: data.jwt});
    } catch (error) {
        console.log(error);
        dispatch({type: LOGIN_FAILURE, payload: error});
    }

}


export const registerUser = (loginData) => async(dispatch) => {
    dispatch({type: LOGIN_REQUEST,});
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`, loginData.data);
        if(data.jwt) {
            localStorage.setItem("token", data.jwt);
        }
        console.log(data);
        dispatch({type: LOGIN_SUCCESS, payload: data.jwt});
    } catch (error) {
        console.log(error);
        dispatch({type: LOGIN_FAILURE, payload: error});
    }

}