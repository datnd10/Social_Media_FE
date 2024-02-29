import {applyMiddleware, combineReducers, legacy_createStore} from "redux";

import {thunk} from "redux-thunk";
import { authReducer } from "./auth/auth.reducer";
import { postReducer } from "./post/post.reducer";
import { messageReducer } from "./message/message.reducer";
import {  userReducer } from "./user/user.reducer";
import { reelReducer } from "./reel/reel.reducer";

const rootReducers = combineReducers({
    auth: authReducer,
    post: postReducer,
    message: messageReducer,
    user: userReducer,
    reel: reelReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))