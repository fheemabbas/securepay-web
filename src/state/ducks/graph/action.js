import * as types from './types'

export const getTotalRevenue = (year, month, startDate, endDate) => ({
  type: types.GET_TOTAL_REVENUE,
  meta: {
    async: true,
    blocking: true,
    path:
      startDate && endDate
        ? `/admin/dashboard/totalrevenue?key=custom&startDate=${startDate}&endDate=${endDate}`
        : month
        ? `/admin/dashboard/totalrevenue?key=month&year=${year}&month=${month}`
        : `/admin/dashboard/totalrevenue?key=year&year=${year}`,
    method: 'GET',
  },
})

export const getAdminFees = (year, month, startDate, endDate) => ({
  type: types.GET_TOTAL_ADMIN_FEES,
  meta: {
    async: true,
    blocking: true,
    path:
      startDate && endDate
        ? `/admin/dashboard/totalcommission?key=custom&startDate=${startDate}&endDate=${endDate}`
        : month
        ? `/admin/dashboard/totalcommission?key=month&year=${year}&month=${month}`
        : `/admin/dashboard/totalcommission?key=year&year=${year}`,
    method: 'GET',
  },
})

export const getTotalJobs = (year, month, startDate, endDate) => ({
  type: types.GET_TOTAL_JOBS,
  meta: {
    async: true,
    blocking: true,
    path:
      startDate && endDate
        ? `/admin/dashboard/getjob?key=custom&startDate=${startDate}&endDate=${endDate}`
        : month
        ? `/admin/dashboard/getjob?key=month&year=${year}&month=${month}`
        : `/admin/dashboard/getjob?key=year&year=${year}`,

    method: 'GET',
  },
})
