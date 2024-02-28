import {
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SEARCH_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
} from "./auth.acctionType";

const initialState = {
  jwt: null,
  error: null,
  loading: false,
  user: null,
  searchUser: [],
  profile: null,
  followers: [],
  followings: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
    case GET_USER_BY_ID_REQUEST:
    case FOLLOW_USER_REQUEST:
    case UNFOLLOW_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PROFILE_SUCCESS:
      return { ...state, user: action.payload, error: null, loading: false };
    case GET_USER_BY_ID_SUCCESS:
      return { ...state, profile: action.payload, error: null, loading: false };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        jwt: action.payload,
        loading: false,
        error: null,
      };
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
      };
    case UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
        profile: action.payload,
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchUser: action.payload,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_USER_BY_ID_FAILURE:
    case FOLLOW_USER_FAILURE:
    case UNFOLLOW_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
