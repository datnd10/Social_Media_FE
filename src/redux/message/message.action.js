import { CREATE_CHAT_FAILURE, CREATE_CHAT_REQUEST, CREATE_CHAT_SUCCESS, CREATE_MESSAGE_FAILURE, CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_SUCCESS, FIND_CHAT_FAILURE, FIND_CHAT_REQUEST, FIND_CHAT_SUCCESS, GET_ALL_CHATS_FAILURE, GET_ALL_CHATS_REQUEST, GET_ALL_CHATS_SUCCESS } from "./message.actionType";
import { api } from "../../config/api"
export const createMessage = (reqData) => async (dispatch) => {
    dispatch({type: CREATE_MESSAGE_REQUEST});
    try {
        const {data} = await api.post(`/api/messages/chat/${reqData.message.chatId}`, reqData.message);
        reqData.sendMessageToServer(data);
        dispatch({type: CREATE_MESSAGE_SUCCESS, payload: data});
    } catch (error) {
        console.log(error);
        dispatch({type: CREATE_MESSAGE_FAILURE, payload: error});
    }
}


export const createChat = (chat) => async (dispatch) => {
    dispatch({type: CREATE_CHAT_REQUEST});
    try {
        console.log(chat);
        const {data} = await api.post(`/api/chats`, chat);
        console.log("create chat", data);
        dispatch({type: CREATE_CHAT_SUCCESS, payload: data});
    } catch (error) {
        console.log(error);
        dispatch({type: CREATE_CHAT_FAILURE, payload: error});
    }
}

export const getAllChats = () => async (dispatch) => {
    dispatch({type: GET_ALL_CHATS_REQUEST});
    try {
        const {data} = await api.get(`/api/chats`);
        console.log(data);
        dispatch({type: GET_ALL_CHATS_SUCCESS, payload: data});
    } catch (error) {
        console.log(error);
        dispatch({type: GET_ALL_CHATS_FAILURE, payload: error});
    }
}

export const findChat = (chat) => async (dispatch) => {
    dispatch({type: FIND_CHAT_REQUEST});
    try {
        const {data} = await api.post(`/api/find/chats`, chat);
        console.log("create chat", data);
        dispatch({type: FIND_CHAT_SUCCESS, payload: data});
    } catch (error) {
        console.log(error);
        dispatch({type: FIND_CHAT_FAILURE, payload: error});
    }
}