import { get } from "lodash";
import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const filterInitialState = {
    show: false,
    count: 0,
    filters: {
        fromDate: '',
        endDate: ''
    }
}

// const totalNotificationReducer = createReducer(0)({
//     [types.GET_NOTIFICATION_LIST_COMPLETED]: (state, action) => get(action, 'payload.payload.total', 0)
// });

const listNotificationReducer = createReducer([])({
    [types.GET_NOTIFICATION_LIST_COMPLETED]: (state, action) => get(action, 'payload.payload.data', []),
});

const notificationCountReducer = createReducer(0)({
    [types.SHOW_NOTIFICATION_COUNT]: (state, action) => action.payload,
});


export default combineReducers({
    total: notificationCountReducer,
    list: listNotificationReducer
});
