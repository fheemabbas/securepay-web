import * as types from "./types";

export const showToast = (payload) => ({
    type: types.SHOW_TOAST,
    payload
});

export const hideToast = (payload) => ({
    type: types.HIDE_TOAST,
});

export const showLoader = (payload) => ({
    type: types.SHOW_LOADER,
    payload
});

export const hideLoader = (payload) => ({
    type: types.HIDE_LOADER,
});