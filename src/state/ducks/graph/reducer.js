import { combineReducers } from 'redux'
import * as types from './types'

import { createReducer } from '../../utils'

const getTotalRevenues = createReducer(null)({
  [types.GET_TOTAL_REVENUE_COMPLETED]: (state, action) => {
    const totalRevenue = action.payload.payload || action.payload.data.payload
    return { ...totalRevenue[0] }
  },
})

const getTotalAdminFees = createReducer(null)({
  [types.GET_TOTAL_ADMIN_FEES_COMPLETED]: (state, action) => {
    const totalAdminFees = action.payload.payload || action.payload.data.payload
    return { ...totalAdminFees[0] }
  },
})

const getTotalJobsData = createReducer(null)({
  [types.GET_TOTAL_JOBS_COMPLETED]: (state, action) => {
    const totalJobsData = action.payload.payload || action.payload.data.payload
    return { ...totalJobsData[0] }
  },
})

export default combineReducers({
  totalRevenue: getTotalRevenues,
  totalAdminFees: getTotalAdminFees,
  totalJobsData: getTotalJobsData,
})
