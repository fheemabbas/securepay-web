import { combineReducers } from "redux";
import * as types from "./types";

import { createReducer } from "../../utils";

const invitedUserReducer = createReducer(null)({
    [types.GET_INVITED_USERLIST_COMPLETED]: (state, action) => {
        const invitedUser = action.payload || action.payload.data;
        return { invitedUser }
    },
});
const getdUserReducer = createReducer(null)({
    [types.GET_USER_DETAILS_COMPLETED]: (state, action) => {
        const jobDetails = action.payload.payload || action.payload.data.payload;
        return { ...jobDetails[0] }
    },
});

const getJobReducer = createReducer(null)({
    [types.GET_JOB_COMPLETED]: (state, action) => {
        const jobListing = action.payload.payload || action.payload.data.payload;
        return jobListing
    },
});
const getCustomerReducer = createReducer(null)({
    [types.GET_CUSTOMER_COMPLETED]: (state, action) => {
        const customerListing = action.payload.payload || action.payload.data.payload;
        return customerListing
    },
});

const getInvitedJobReducer = createReducer(null)({
    [types.GET_INVITED_JOB_COMPLETED]: (state, action) => {
        const jobInvitedJobListing = action.payload.payload || action.payload.data.payload;
        return jobInvitedJobListing
    },
});

const getCount = createReducer(null)({
    [types.GET_JOB_COUNT_COMPLETED]: (state, action) => {
        const getcount = action.payload.payload || action.payload.data.payload;;
        return { ...getcount }
    },
});
const onGoingJob = createReducer(null)({
    [types.GET_ONGOING_JOB_COMPLETED]: (state, action) => {
        const onGoingJobs = action.payload.payload || action.payload.data.payload;;
        return onGoingJobs
    },
});
const acceptJob = createReducer(null)({
    [types.ACCEPT_JOB_COMPLETED]: (state, action) => {
        const acceptJob = action.payload.payload || action.payload.data.payload;;
        return acceptJob
    },
});
const rejectJob = createReducer(null)({
    [types.REJECT_JOB_COMPLETED]: (state, action) => {
        const rejectJob = action.payload.payload || action.payload.data.payload;;
        return rejectJob
    },
});
const getTicketDetailsReducer = createReducer(null)({
    [types.GET_TICKET_DETAILS_COMPLETED]: (state, action) => {
        const ticketDetails = action.payload.payload || action.payload.data.payload;
        return { ...ticketDetails[0] }
    },
});

const getDisputeDetailsReducer = createReducer(null)({
    [types.GET_DISPUTE_REISED_DETAILS_COMPLETED]: (state, action) => {
        const ticketDetails = action.payload.payload || action.payload.data.payload;
        return { ...ticketDetails[0] }
    },
});

const getKYCStatus = createReducer(null)({
    [types.GET_KYC_STATUS_COMPLETED]: (state, action) => {
        const kycStatus = action.payload.payload || action.payload.data.payload;
        return kycStatus
    },
});
export default combineReducers({
    invitedUser: invitedUserReducer,
    userDetails: getdUserReducer,
    jobListing: getJobReducer,
    jobInvitedJobListing: getInvitedJobReducer,
    allCounts: getCount,
    onGoingJob: onGoingJob,
    acceptJob: acceptJob,
    rejectJob: rejectJob,
    getCustomerReducer: getCustomerReducer,
    tickeitDetails: getTicketDetailsReducer,
    disputeDetails: getDisputeDetailsReducer,
    kycStatus: getKYCStatus
});
