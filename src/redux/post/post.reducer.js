import {
  CREATE_COMMENT_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_SAVE_POST_REQUEST,
  GET_SAVE_POST_SUCCESS,
  GET_USERS_POST_FAILURE,
  GET_USERS_POST_REQUEST,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
} from "./post.actionType";

const initialState = {
  post: null,
  loading: false,
  error: null,
  posts: [],
  like: null,
  comments:[],
  newComment: null,
  savePost: []
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
    case GET_ALL_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case GET_USERS_POST_REQUEST:
    case DELETE_POST_REQUEST:
    case SAVE_POST_REQUEST:
    case GET_SAVE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        posts: [action.payload, ...state.post],
        loading: false,
        error: null,
      };
    case GET_ALL_POST_SUCCESS:
    case GET_USERS_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        comments: action.payload.comments,
        loading: false,
        error: null,
      };
    case GET_SAVE_POST_SUCCESS:
      return {
        ...state,
        savePost: action.payload,
        loading: false,
        error: null,
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        like: action.payload,
        loading: false,
        posts: state.posts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
        error: null,
      };
    
    case SAVE_POST_SUCCESS:
      return {
        ...state,
        savePost: action.payload,
        loading: false,
        error: null,
        posts: state.posts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
        error: null,
      }

    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        newComment: action.payload
      }

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      }
    case CREATE_POST_FAILURE:
    case GET_ALL_POST_FAILURE:
    case LIKE_POST_FAILURE:
    case GET_USERS_POST_FAILURE:
    case DELETE_POST_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
