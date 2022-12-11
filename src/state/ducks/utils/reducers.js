import { combineReducers } from "redux";
import * as types from "./types";

import { createReducer } from "../../utils";

const toastInitialState = {
    show: false,
    message: '',
    type: 'success',
    time: 5000
}

const toastReducer = createReducer(toastInitialState)({
    [types.SHOW_TOAST]: (state, action) => ({ show: true, ...action.payload }),
    [types.HIDE_TOAST]: () => toastInitialState,
});

const loaderReducer = createReducer(false)({
    [types.SHOW_LOADER]: () => true,
    [types.HIDE_LOADER]: () => false,
});

export default combineReducers({
    toast: toastReducer,
    loader: loaderReducer
});
