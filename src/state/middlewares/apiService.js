import { get } from "lodash"
import { fetch } from "../utils";


const apiService = ({ getState }) => (next) => (action, state) => {
    const result = next(action);

    if (!action.meta || !action.meta.async) {
        return result;
    }

    const { path, method = "GET", body } = action.meta;
    if (!path) {
        throw new Error(`'path' not specified for async action ${action.type}`);
    }

    const url = `${path}`;
    const token = get(getState(), 'auth.session.token', null);
    return fetch(url, method, body, token).then(
        res => handleResponse(res, action, next),
        err => handleErrors(err, action, next),
    );
};

export default apiService;

function handleErrors(err, action, next) {
    if (err.isAxiosError && err.response && (err.response.status === 401 || err.response.status === 403)) {
        next({
            type: `auth/AUTHORIZATION_FAILED`,
            payload: err,
            meta: action.meta,
        });
    } else {
        next({
            type: `${action.type}_FAILED`,
            payload: err,
            meta: action.meta,
        });
    }
    return Promise.reject(err);
}

function handleResponse(res, action, next) {
    next({
        type: `${action.type}_COMPLETED`,
        payload: res,
        meta: action.meta,
    });
    return res;
}
