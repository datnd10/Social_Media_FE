import {
  CREATE_NONTIFICATION_FAILURE,
  CREATE_NONTIFICATION_REQUEST,
  CREATE_NONTIFICATION_SUCCESS,
  DELETE_NONTIFICATION_FAILURE,
  DELETE_NONTIFICATION_REQUEST,
  DELETE_NONTIFICATION_SUCCESS,
  GET_NONTIFICATION_USER_FAILURE,
  GET_NONTIFICATION_USER_REQUEST,
  GET_NONTIFICATION_USER_SUCCESS,
  WATCH_NONTIFICATION_FAILURE,
  WATCH_NONTIFICATION_REQUEST,
  WATCH_NONTIFICATION_SUCCESS,
} from "./nontification.actionType";

const initialState = {
  nontification: [],
  error: null,
  message: null,
};

export const nontificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NONTIFICATION_REQUEST:
    case GET_NONTIFICATION_USER_REQUEST:
    case WATCH_NONTIFICATION_REQUEST:
    case DELETE_NONTIFICATION_REQUEST:
      return { ...state, messages: action.payload };
    case CREATE_NONTIFICATION_SUCCESS:
      return {
        ...state,
        nontification: action.payload,
      };
    case GET_NONTIFICATION_USER_SUCCESS:
      return { ...state, nontification: action.payload };
    case WATCH_NONTIFICATION_SUCCESS:
      return { ...state, nontification: action.payload };
    case DELETE_NONTIFICATION_SUCCESS:
      return { ...state, nontification: action.payload };
    case CREATE_NONTIFICATION_FAILURE:
    case GET_NONTIFICATION_USER_FAILURE:
    case WATCH_NONTIFICATION_FAILURE:
    case DELETE_NONTIFICATION_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
