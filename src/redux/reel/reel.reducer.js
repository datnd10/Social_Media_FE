import {
  CREATE_REEL_REQUEST,
  CREATE_REEL_SUCCESS,
  DELETE_REEL_REQUEST,
  DELETE_REEL_SUCCESS,
  GET_ALL_REEL_FAILURE,
  GET_ALL_REEL_REQUEST,
  GET_ALL_REEL_SUCCESS,
  GET_REEL_BY_USER_REQUEST,
  GET_REEL_BY_USER_SUCCESS,
} from "./reel.actionType";

const initialState = {
  error: null,
  loading: false,
  listReel: [],
  userReel: [],
};

export const reelReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REEL_REQUEST:
    case GET_REEL_BY_USER_REQUEST:
    case DELETE_REEL_REQUEST:
    case CREATE_REEL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_REEL_SUCCESS:
      return {
        ...state,
        listReel: [action.payload, ...state.listReel],
        loading: false,
        error: null,
      };

    case DELETE_REEL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      }
    case GET_ALL_REEL_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        listReel: action.payload,
        error: null,
        loading: false,
      };
    case GET_REEL_BY_USER_SUCCESS:
      return {
        ...state,
        userReel: action.payload,
        error: null,
        loading: false,
      };

    case GET_ALL_REEL_FAILURE:
    case GET_REEL_BY_USER_REQUEST:
    case DELETE_REEL_REQUEST:
    case CREATE_REEL_REQUEST:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
