import { api } from "../../config/api";
import { CREATE_STORY_FAILURE, CREATE_STORY_REQUEST, CREATE_STORY_SUCCESS, DELETE_STORY_FAILURE, DELETE_STORY_REQUEST, DELETE_STORY_SUCCESS, GET_STORY_BY_FOLLOWING_FAILURE, GET_STORY_BY_FOLLOWING_REQUEST, GET_STORY_BY_FOLLOWING_SUCCESS, GET_STORY_BY_ID_FAILURE, GET_STORY_BY_ID_REQUEST, GET_STORY_BY_ID_SUCCESS, GET_USER_STORY_FAILURE, GET_USER_STORY_REQUEST, GET_USER_STORY_SUCCESS, LIKE_STORY_FAILURE, LIKE_STORY_REQUEST, LIKE_STORY_SUCCESS, REPLY_STORY_FAILURE, REPLY_STORY_REQUEST, REPLY_STORY_SUCCESS, WATCH_STORY_FAILURE, WATCH_STORY_REQUEST, WATCH_STORY_SUCCESS } from "./story.actionType";



export const createStory = (postData) => async (dispatch) => {
    dispatch({type: CREATE_STORY_REQUEST});
    try {
        const {data} = await api.post(`/api/story`, postData);
        dispatch({type: CREATE_STORY_SUCCESS,  payload: data});
        console.log(data);
    } catch (error) {
        console.log(error);
        dispatch({type: CREATE_STORY_FAILURE, payload: error});
    }
}

export const deleteStory = (storyId) => async (dispatch) => {
    dispatch({type: DELETE_STORY_REQUEST});
    try {
        const {data} = await api.put(`/api/story/${storyId}`);
        dispatch({type: DELETE_STORY_SUCCESS,  payload: data});
    } catch (error) {
        console.log(error);
        dispatch({type: DELETE_STORY_FAILURE, payload: error});
    }
}

export const getAllStoryByFollowing = () => async (dispatch) => {
    dispatch({type: GET_STORY_BY_FOLLOWING_REQUEST});
    try {
        const {data} = await api.get(`/api/story/following`);
        dispatch({type: GET_STORY_BY_FOLLOWING_SUCCESS,  payload: data});
    } catch (error) {
        console.log(error);
        dispatch({type: GET_STORY_BY_FOLLOWING_FAILURE, payload: error});
    }
}

export const getUserStory = (userId) => async (dispatch) => {
    dispatch({type: GET_USER_STORY_REQUEST});
    try {
        const {data} = await api.get(`/api/story/user/${userId}`);
        dispatch({type: GET_USER_STORY_SUCCESS,  payload: data});
    } catch (error) {
        console.log(error);
        dispatch({type: GET_USER_STORY_FAILURE, payload: error});
    }
}

export const getDetailStory = (story) => async (dispatch) => {
    dispatch({type: GET_STORY_BY_ID_REQUEST});
    try {
        const {data} = await api.get(`/api/story/${story}`);
        dispatch({type: GET_STORY_BY_ID_SUCCESS,  payload: data});  
    } catch (error) {
        console.log(error);
        dispatch({type: GET_STORY_BY_ID_FAILURE, payload: error});
    }
}

export const getLikeStory = (postId) => async (dispatch) => {
    dispatch({type: LIKE_STORY_REQUEST});
    try {
        const {data} = await api.put(`/api/story/like/${postId}`);
        dispatch({type: LIKE_STORY_SUCCESS,  payload: data});
        console.log("like post", data);
    } catch (error) {
        console.log(error);
        dispatch({type: LIKE_STORY_FAILURE, payload: error});
    }
}

export const watchStory = (watchId) => async (dispatch) => {
    dispatch({type: WATCH_STORY_REQUEST});
    try {
        const {data} = await api.put(`/api/story/watch/${watchId}`);
        dispatch({type: WATCH_STORY_SUCCESS,  payload: data});
        console.log("like post", data);
    } catch (error) {
        console.log(error);
        dispatch({type: WATCH_STORY_FAILURE, payload: error});
    }
}


export const replyStory = (storyId, chatId, reply) => async (dispatch) => {
    dispatch({type: REPLY_STORY_REQUEST});
    try {
        const {data} = await api.put(`/api/reply/story/${storyId}/chat/${chatId}`, reply);
        dispatch({type: REPLY_STORY_SUCCESS,  payload: data});
        console.log("like post", data);
    } catch (error) {
        console.log(error);
        dispatch({type: REPLY_STORY_FAILURE, payload: error});
    }
}
