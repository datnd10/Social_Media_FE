import { API_BASE_URL, api } from "../../config/api"
import { CREATE_REEL_FAILURE, CREATE_REEL_REQUEST, CREATE_REEL_SUCCESS, DELETE_REEL_FAILURE, DELETE_REEL_REQUEST, DELETE_REEL_SUCCESS, GET_ALL_REEL_FAILURE, GET_ALL_REEL_REQUEST, GET_ALL_REEL_SUCCESS, GET_REEL_BY_USER_FAILURE, GET_REEL_BY_USER_REQUEST, GET_REEL_BY_USER_SUCCESS } from "./reel.actionType";


export const createReel = (reelData) => async (dispatch) => {
    dispatch({type: CREATE_REEL_REQUEST});
    try {
        const {data} = await api.post(`/api/reels`, reelData);
        dispatch({type: CREATE_REEL_SUCCESS,  payload: data});
        console.log(data);
    } catch (error) {
        console.log(error);
        dispatch({type: CREATE_REEL_FAILURE, payload: error});
    }
}

export const deleteReel = (reelId) => async (dispatch) => {
    dispatch({type: DELETE_REEL_REQUEST});
    try {
        const {data} = await api.put(`/api/reels/${reelId}`);
        dispatch({type: DELETE_REEL_SUCCESS,  payload: data});
        console.log(data);
    } catch (error) {
        console.log(error);
        dispatch({type: DELETE_REEL_FAILURE, payload: error});
    }
}

export const getAllReel = () => async (dispatch) => {
    dispatch({type: GET_ALL_REEL_REQUEST});
    try {
        const {data} = await api.get(`/api/reels`);
        dispatch({type: GET_ALL_REEL_SUCCESS,  payload: data});
        console.log("get all reel", data);
    } catch (error) {
        console.log(error);
        dispatch({type: GET_ALL_REEL_FAILURE, payload: error});
    }
}

export const getUsersReel = (userId) => async (dispatch) => {
    dispatch({type: GET_REEL_BY_USER_REQUEST});
    try {
        const {data} = await api.get(`/api/reels/user/${userId}`);
        dispatch({type: GET_REEL_BY_USER_SUCCESS,  payload: data});
        console.log("get user post");
    } catch (error) {
        console.log(error);
        dispatch({type: GET_REEL_BY_USER_FAILURE, payload: error});
    }
}

