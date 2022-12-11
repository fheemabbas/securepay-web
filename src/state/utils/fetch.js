import axios from "./../../config/axios";

export default (url, method, body, token) => {
    const options = {
        url,
        method,
        data: method !== "GET" ? body : null,
        headers: {}
    };

    if (body instanceof FormData) {
        options.headers = Object.assign(options.headers, { 'Content-Type': 'multipart/form-data' })
    }

    if (token) {
        options.headers = { authorization: token }
    }

    return axios.request(options)
};