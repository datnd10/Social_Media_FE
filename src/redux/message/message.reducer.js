import {  CREATE_CHAT_SUCCESS, CREATE_MESSAGE_SUCCESS, FIND_CHAT_SUCCESS, GET_ALL_CHATS_SUCCESS } from "./message.actionType"

const initialState = {
    messages :[],
    chats: [],
    loading: false,
    error: null,
    message: null,
    chat: null
}

export const messageReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_MESSAGE_SUCCESS:
            return {...state, messages: action.payload}
        case CREATE_CHAT_SUCCESS:
            return {...state, chats: [action.payload, ...state.chats]}
        case FIND_CHAT_SUCCESS:
            return {...state, chat: action.payload}
        case GET_ALL_CHATS_SUCCESS:
            return {...state, chats: action.payload}
        default:
            return state
    }
}