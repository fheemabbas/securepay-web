import { combineReducers } from "redux";
import * as types from "./types";

import { createReducer } from "../../utils";
import JWTService from "./../../../services/jwt.service";
import StorageService from "./../../../services/localstorage.service";

const authReducer = createReducer(false)({
  [types.LOGOUT]: () => false,
  [types.AUTHENTICATED]: () => true,
  [types.AUTHORIZATION_FAILED]: () => {
    StorageService.removeItem("isAuthenticated");
    StorageService.removeItem("user");
    StorageService.removeItem("token");
    return false;
  },
});

const initializeSessionReducer = createReducer(null)({
  [types.INITIALIZE]: (state, action) => {
    const user = action.payload.user;
    const tokens = action.payload.tokens;
    StorageService.setItem("isAuthenticated", true);
    StorageService.setItem("user", user);
    JWTService.saveToken(tokens);
    return { user, tokens };
  },
  [types.DESTROY]: () => {
    StorageService.clear()
    // StorageService.removeItem("isAuthenticated");
    // StorageService.removeItem("user");
    // StorageService.removeItem("roletype");
    // StorageService.removeItem("JobId");
    // StorageService.removeItem("loginRole");
    JWTService.destroyToken();
    return null;
  },
});

const signupwithEmail = createReducer(false)({
  [types.SIGNUP_WITH_EMAIL_COMPLETED]: (state, action) => {
    const user = action.payload.payload.id;
    StorageService.setItem("sign-up_ID", user);
    return { user };
  },
  [types.SIGNUP_PROCESS_COMPLETED]: (state, action) => {
    const user = action.payload.payload.id;
    StorageService.setItem("sign-up_ID", user);
    return { user };
  },
  [types.SET_USER]: (state, action) => {
    const user = action.payload;
    StorageService.setItem("sign-up_ID", user);
    return { user };
  },
  [types.LOGIN_WITH_SOCIAL_COMPLETED]: (state, action) => {
    const user = action.payload;
    if (user.payload.register_status) {
      StorageService.setItem("sign-up_ID", user.payload.user._id);
    }
    return { user };
  },
  [types.LOGIN_WITH_SOCIAL_FAILED]: (state, action) => {
    const user = action.payload.response.data;
    return { user };
  },
});

export default combineReducers({
  isAuthenticated: authReducer,
  session: initializeSessionReducer,
  signup: signupwithEmail,
});
