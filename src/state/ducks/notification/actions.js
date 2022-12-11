import * as types from "./types";
import { getParams } from "../../../util/services"

export const getNotificationList = (actions) => {
    return ({
        type: types.GET_NOTIFICATION_LIST,
        meta: {
            async: true,
            blocking: true,
            path: actions,
            method: "GET",
        },
    })
};

export const showNotificationCount = (payload) => ({
    type: types.SHOW_NOTIFICATION_COUNT,
    payload
})

// export const deleteNotification = (notificationId) => {
//     return ({
//         type: types.DELETE_NOTIFICATION,
//         meta: {
//             async: true,
//             blocking: true,
//             path: `notification/${notificationId}/delete`,
//             method: "PUT",
//         },
//     })
// };

// export const deleteAllNotification = () => {
//     return ({
//         type: types.DELETE_ALL_NOTIFICATION,
//         meta: {
//             async: true,
//             blocking: true,
//             path: `notification/deleteall`,
//             method: "PUT",
//         },
//     })
// };

// export const readNotification = (notificationId) => {
//     return ({
//         type: types.READ_NOTIFICATION,
//         meta: {
//             async: true,
//             blocking: true,
//             path: `notification/${notificationId}/read`,
//             method: "PUT",
//         },
//     })
// };

// export const readAllNotification = () => {
//     return ({
//         type: types.READ_ALL_NOTIFICATION,
//         meta: {
//             async: true,
//             blocking: true,
//             path: `notification/readall`,
//             method: "PUT",
//         },
//     })
// };

// export const showNotificationFilters = (payload = {}) => {
//     return ({
//         type: types.SHOW_NOTIFICATION_FILTER,
//         payload
//     })
// }

// export const hideNotificationFilters = (payload = {}) => {
//     return ({
//         type: types.HIDE_NOTIFICATION_FILTER,
//         payload
//     })
// }
