import { api } from "../../config/api";
import { CREATE_NONTIFICATION_FAILURE, CREATE_NONTIFICATION_REQUEST, CREATE_NONTIFICATION_SUCCESS, DELETE_NONTIFICATION_FAILURE, DELETE_NONTIFICATION_REQUEST, DELETE_NONTIFICATION_SUCCESS, GET_NONTIFICATION_USER_FAILURE, GET_NONTIFICATION_USER_REQUEST, GET_NONTIFICATION_USER_SUCCESS, WATCH_NONTIFICATION_FAILURE, WATCH_NONTIFICATION_REQUEST, WATCH_NONTIFICATION_SUCCESS } from "./nontification.actionType";

export const createNontification = (nontificationData, postId, userId, sendNotificationToServer) => async (dispatch) => {
    console.log(userId);
    dispatch({type: CREATE_NONTIFICATION_REQUEST});
    try {
        const {data} = await api.post(`/api/nontification/post/${postId}/to/${userId}`, nontificationData);
        sendNotificationToServer(userId, data);
        dispatch({type: CREATE_NONTIFICATION_SUCCESS,  payload: data});
    } catch (error) {
        console.log(error);
        dispatch({type: CREATE_NONTIFICATION_FAILURE, payload: error});
    }
}

export const deleteNontification = (nontificationId) => async (dispatch) => {
    dispatch({type: DELETE_NONTIFICATION_REQUEST});
    try {
        const {data} = await api.delete(`/api/nontification/${nontificationId}`);
        dispatch({type: DELETE_NONTIFICATION_SUCCESS,  payload: data});
    } catch (error) {
        console.log(error);
        dispatch({type: DELETE_NONTIFICATION_FAILURE, payload: error});
    }
}

export const getUserNontification = (userId) => async (dispatch) => {
    dispatch({type: GET_NONTIFICATION_USER_REQUEST});
    try {
        const {data} = await api.get(`/api/nontification/user/${userId}`);
        dispatch({type: GET_NONTIFICATION_USER_SUCCESS,  payload: data});
    } catch (error) {
        console.log(error);
        dispatch({type: GET_NONTIFICATION_USER_FAILURE, payload: error});
    }
}



export const watchNontification = (watchId) => async (dispatch) => {
    dispatch({type: WATCH_NONTIFICATION_REQUEST});
    try {
        const {data} = await api.put(`/api/nontification/watch/${watchId}`);
        dispatch({type: WATCH_NONTIFICATION_SUCCESS,  payload: data});
        console.log("like post", data);
    } catch (error) {
        console.log(error);
        dispatch({type: WATCH_NONTIFICATION_FAILURE, payload: error});
    }
}
