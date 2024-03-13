import {
  CREATE_STORY_FAILURE,
  CREATE_STORY_SUCCESS,
  DELETE_STORY_REQUEST,
  DELETE_STORY_SUCCESS,
  GET_STORY_BY_FOLLOWING_REQUEST,
  GET_STORY_BY_FOLLOWING_SUCCESS,
  GET_STORY_BY_ID_REQUEST,
  GET_STORY_BY_ID_SUCCESS,
  GET_USER_STORY_REQUEST,
  GET_USER_STORY_SUCCESS,
  LIKE_STORY_REQUEST,
  LIKE_STORY_SUCCESS,
  GET_STORY_BY_FOLLOWING_FAILURE,
  LIKE_STORY_FAILURE,
  GET_USER_STORY_FAILURE,
  GET_STORY_BY_ID_FAILURE,
  DELETE_STORY_FAILURE,
  WATCH_STORY_REQUEST,
  WATCH_STORY_FAILURE,
} from "./story.actionType";

const initialState = {
  story: null,
  loading: false,
  error: null,
  userStory: [],
  stories: [],
  like: null,
};

export const storyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STORY_SUCCESS:
    case GET_STORY_BY_FOLLOWING_REQUEST:
    case LIKE_STORY_REQUEST:
    case GET_USER_STORY_REQUEST:
    case GET_STORY_BY_ID_REQUEST:
    case DELETE_STORY_REQUEST:
    case WATCH_STORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_STORY_SUCCESS:
      return {
        ...state,
        story: action.payload,
        stories: [action.payload, ...state.story],
        loading: false,
        error: null,
      };
    case GET_STORY_BY_ID_SUCCESS:
      return {
        ...state,
        story: action.payload,
        loading: false,
        error: null,
      };
    case GET_STORY_BY_FOLLOWING_SUCCESS:
      return {
        ...state,
        stories: action.payload,
        loading: false,
        error: null,
      };
    case GET_USER_STORY_SUCCESS:
      return {
        ...state,
        userStory: action.payload,
        loading: false,
        error: null,
      };

    case LIKE_STORY_SUCCESS:
      return {
        ...state,
        like: action.payload,
        loading: false,
        stories: state.stories.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
        error: null,
      };
    case DELETE_STORY_SUCCESS:
      return {
        ...state,
        stories: state.stories.filter((item) => item.id !== action.payload),
        loading: false,
        error: null,
      };
    case CREATE_STORY_FAILURE:
    case GET_STORY_BY_FOLLOWING_FAILURE:
    case LIKE_STORY_FAILURE:
    case GET_USER_STORY_FAILURE:
    case GET_STORY_BY_ID_FAILURE:
    case DELETE_STORY_FAILURE:
    case WATCH_STORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
