import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS } from "./post.actionType";
import { API_BASE_URL, api } from "../../config/api"
export const createPost = (postData) => async (dispatch) => {
    dispatch({type: CREATE_POST_REQUEST});
    try {
        const {data} = await api.post(`/api/posts`, postData);
        dispatch({type: CREATE_POST_SUCCESS,  payload: data});
        console.log(data);
    } catch (error) {
        console.log(error);
        dispatch({type: CREATE_POST_FAILURE, payload: error});
    }
}


export const getAllPost = () => async (dispatch) => {
    dispatch({type: GET_ALL_POST_REQUEST});
    try {
        const {data} = await api.get(`/api/posts`);
        dispatch({type: GET_ALL_POST_SUCCESS,  payload: data});
        console.log("get all post", data);
    } catch (error) {
        console.log(error);
        dispatch({type: GET_ALL_POST_FAILURE, payload: error});
    }
}

export const getUsersPost = (userId) => async (dispatch) => {
    dispatch({type: GET_USERS_POST_REQUEST});
    try {
        const {data} = await api.get(`/api/posts/user/${userId}`);
        dispatch({type: GET_USERS_POST_SUCCESS,  payload: data});
        console.log("get user post");
    } catch (error) {
        console.log(error);
        dispatch({type: GET_USERS_POST_FAILURE, payload: error});
    }
}

export const getLikePost = (postId) => async (dispatch) => {
    dispatch({type: LIKE_POST_REQUEST});
    try {
        const {data} = await api.get(`/api/posts/like/${postId}/`);
        dispatch({type: LIKE_POST_SUCCESS,  payload: data});
        console.log("like post");
    } catch (error) {
        console.log(error);
        dispatch({type: LIKE_POST_FAILURE, payload: error});
    }
}


export const createComment = (commentData) => async (dispatch) => {
    dispatch({type: CREATE_COMMENT_REQUEST});
    try {
        const {data} = await api.post(`/api/comments/post/${commentData.postId}`, commentData.data);
        dispatch({type: CREATE_COMMENT_SUCCESS,  payload: data});
        console.log(data);
    } catch (error) {
        console.log(error);
        dispatch({type: CREATE_COMMENT_FAILURE, payload: error});
    }
}
