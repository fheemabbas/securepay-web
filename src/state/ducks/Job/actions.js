import * as types from "./types";

export const createJob = (payload) => ({
  type: types.CREATE_JOB,
  meta: {
    async: true,
    blocking: true,
    path: "/job/create",
    method: "POST",
    body: payload,
  },
});
export const getInvitedUserlist = () => ({
  type: types.GET_INVITED_USERLIST,
  meta: {
    async: true,
    blocking: true,
    path: `/job/getInviteUserList`,
    method: "GET",
  },
});
export const getOneuserDetails = (jobid) => ({
  type: types.GET_USER_DETAILS,
  meta: {
    async: true,
    blocking: true,
    path: `/job/getDetails?jobId=${jobid}`,
    method: "GET",
  },
});

export const createMilestone = (payload) => ({
  type: types.CREATE_MILESTONE,
  meta: {
    async: true,
    blocking: true,
    path: "/milestone/create",
    method: "POST",
    body: payload,
  },
});

export const sendMilestoneEmail = (jobid) => ({
  type: types.MILESTONE_EMAIL,
  meta: {
    async: true,
    blocking: true,
    path: `/milestone/confirm?jobId=${jobid}`,
    method: "POST",
  },
});

export const getJob = (url) => (
  {
    type: types.GET_JOB,
    meta: {
      async: true,
      blocking: true,
      path: url,
      method: "GET",
    },
  });

export const getInvitedJob = (url) => (
  {
    type: types.GET_INVITED_JOB,
    meta: {
      async: true,
      blocking: true,
      path: url,
      method: "GET",
    },
  });
export const getCustomer = (url) => (
  {
    type: types.GET_CUSTOMER,
    meta: {
      async: true,
      blocking: true,
      path: url,
      method: "GET",
    },
  });

export const getJobCount = (url) => (
  {
    type: types.GET_JOB_COUNT,
    meta: {
      async: true,
      blocking: true,
      path: url,
      method: "GET",
    },
  });

export const UpdateCustomerStatus = (id, payload) => (
  {
    type: types.UPDATE_CUSTOMER_STATUS,
    meta: {
      async: true,
      blocking: true,
      path: "customer/disabled?customerId=" + id,
      method: "PUT",
      body: payload
    }
  });

export const getOngoingJob = (url) => (
  {
    type: types.GET_ONGOING_JOB,
    meta: {
      async: true,
      blocking: true,
      path: url,
      method: "GET",
    },
  });

export const acceptJob = (jobId) => (
  {
    type: types.ACCEPT_JOB,
    meta: {
      async: true,
      blocking: true,
      path: "/job/" + jobId + "/accept",
      method: "PATCH",
    },
  });
export const rejectJob = (jobId, payload) => (
  {
    type: types.REJECT_JOB,
    meta: {
      async: true,
      blocking: true,
      path: "/job/" + jobId + "/reject",
      method: "PATCH",
      body: payload
    },
  });
export const addMilestone = (payload) => (
  {
    type: types.EDIT_MILESTONE,
    meta: {
      async: true,
      blocking: true,
      path: `milestone`,
      method: "POST",
      body: payload
    },
  });
export const editMilestone = (milestoneId, payload) => (
  {
    type: types.EDIT_MILESTONE,
    meta: {
      async: true,
      blocking: true,
      path: `milestone/${milestoneId}`,
      method: "PUT",
      body: payload
    },
  });
export const deleteMilestone = (milestoneId) => (
  {
    type: types.DELETE_MILESTONE,
    meta: {
      async: true,
      blocking: true,
      path: `milestone/${milestoneId}`,
      method: "DELETE",
    },
  });

export const saveJob = (jobId, payload) => (
  {
    type: types.SAVE_JOB,
    meta: {
      async: true,
      blocking: true,
      path: `job/amount/${jobId}/confirm`,
      method: "PATCH",
      body: payload
    },
  });
export const escrowPaymentWithBank = (payload) => (
  {
    type: types.ESCROW_PAYMENT,
    meta: {
      async: true,
      blocking: true,
      path: 'payment/escrow-with-bank',
      method: "POST",
      body: payload
    },
  });
export const escrowPaymentWithCard = (payload) => (
  {
    type: types.ESCROW_PAYMENT,
    meta: {
      async: true,
      blocking: true,
      path: 'payment/escrow-with-card',
      method: "POST",
      body: payload
    },
  });
export const checkTrueLayerStatus = (paymentId, mileStoneId, JobId) => (
  {
    type: types.CHECK_TRUELAYER_STATUS,
    meta: {
      async: true,
      blocking: true,
      path: 'payment/truelayer/status?paymentId=' + paymentId + '&mileStoneId=' + mileStoneId + '&jobId=' + JobId,
      method: "get"
    },
  });

export const jobModificationRequest = (payload) => (
  {
    type: types.MODIFICATION_REQUEST,
    meta: {
      async: true,
      blocking: true,
      path: "job/modification/request",
      method: "PATCH",
      body: payload
    },
  });

export const supportAndTicket = (payload) => (
  {
    type: types.SUPPORT_AND_TICKET,
    meta: {
      async: true,
      blocking: true,
      path: `support/ticket`,
      method: "POST",
      body: payload
    },
  });
export const getSupportAndTicket = (url) => (
  {
    type: types.GET_SUPPORT_AND_TICKET,
    meta: {
      async: true,
      blocking: true,
      path: url,
      method: "GET",
    },
  });
export const getOneTicketDetails = (ticketId) => ({
  type: types.GET_TICKET_DETAILS,
  meta: {
    async: true,
    blocking: true,
    path: `/support/ticket/details?ticketId=${ticketId}`,
    method: "GET",
  },
});
export const supportAndTicketComment = (payload) => (
  {
    type: types.SUPPORT_AND_TICKET_COMMENT,
    meta: {
      async: true,
      blocking: true,
      path: `support/ticket/comment`,
      method: "POST",
      body: payload
    },
  });

export const supportAndTicketResloved = (ticketId) => (
  {
    type: types.SUPPORT_AND_TICKET_RESOLVED,
    meta: {
      async: true,
      blocking: true,
      path: `support/ticket/resolve?ticketId=${ticketId}`,
      method: "PATCH",
    },
  })
export const paymentRealeaseRequest = (mileStoneId) => (
  {
    type: types.PAYMENT_RELEASE_REQUEST,
    meta: {
      async: true,
      blocking: true,
      path: `payment/release/requested?mileStoneId=${mileStoneId}`,
      method: "GET",
    },
  });
export const paymentRelease = (payload) => (
  {
    type: types.PAYMENT_RELEASE,
    meta: {
      async: true,
      blocking: true,
      path: `payment/release`,
      method: "POST",
      body: payload
    },
  });
export const disputeRaised = (payload) => (
  {
    type: types.DISPUTE_REISED,
    meta: {
      async: true,
      blocking: true,
      path: `dispute/raised`,
      method: "POST",
      body: payload
    },
  });
export const GetdisputeRaised = (url) => (
  {
    type: types.GET_DISPUTE_REISED,
    meta: {
      async: true,
      blocking: true,
      path: url,
      method: "GET",
    },
  });

export const getOneDisputeDetails = (disputeID) => ({
  type: types.GET_DISPUTE_REISED_DETAILS,
  meta: {
    async: true,
    blocking: true,
    path: `/dispute/details?disputeId=${disputeID}`,
    method: "GET",
  },
});

export const announce_details = (disputeID, payload) => ({
  type: types.ANNOUNCE_DETAILS,
  meta: {
    async: true,
    blocking: true,
    path: `dispute/announce/?disputeId=${disputeID}`,
    method: "PUT",
    body: payload
  },
});

export const disputeAcceptReject = (disputeID, payload) => ({
  type: types.RISED_DISPUTE_RESULT,
  meta: {
    async: true,
    blocking: true,
    path: `/dispute/accept/?disputeId=${disputeID}`,
    method: "PUT",
    body: payload
  },
});

export const getDisputeByMilestone = (milestoneID) => ({
  type: types.GET_DISPUTE_REISED_DETAILS,
  meta: {
    async: true,
    blocking: true,
    path: `/dispute/milestone/details?milestoneId=${milestoneID}`,
    method: "GET",
  },
});

export const createChannelspace = (disputeID, payload) => ({
  type: types.CREATE_CHANNEL_ID,
  meta: {
    async: true,
    blocking: true,
    path: `/dispute/?disputeId=${disputeID}`,
    method: "PUT",
    body: payload
  },
});

export const addStaffMember = (payload) => (
  {
    type: types.ADD_STAFF_MEMBER,
    meta: {
      async: true,
      blocking: true,
      path: `admin/add`,
      method: "POST",
      body: payload
    },
  });
export const getStaffMember = (url) => (
  {
    type: types.GET_STAFF_MEMBER,
    meta: {
      async: true,
      blocking: true,
      path: url,
      method: "GET",
    },
  });
export const editStaffMember = (id, payload) => (
  {
    type: types.EDIT_STAFF_MEMBER,
    meta: {
      async: true,
      blocking: true,
      path: `admin/update?staffId=${id}`,
      method: "PUT",
      body: payload
    },
  });
export const deleteStaffMember = (memberId) => (
  {
    type: types.DELETE_STAFF_MEMBER,
    meta: {
      async: true,
      blocking: true,
      path: `admin/delete?id=${memberId}`,
      method: "DELETE",
    },
  });
export const editBankDetails = (payload) => (
  {
    type: types.EDIT_PROFILE,
    meta: {
      async: true,
      blocking: true,
      path: `customer/update/bankinfo/`,
      method: "PUT",
      body: payload
    },
  });
export const editPersonalDetails = (payload) => (
  {
    type: types.EDIT_PROFILE,
    meta: {
      async: true,
      blocking: true,
      path: `customer/update/personalinfo/`,
      method: "PUT",
      body: payload
    },
  });
export const getPaymentHistory = (url) => (
  {
    type: types.GET_PAYMENT_HISTORY,
    meta: {
      async: true,
      blocking: true,
      path: url,
      method: "GET",
    },
  });
export const updateProfilePic = (payload) => (
  {
    type: types.EDIT_PROFILE,
    meta: {
      async: true,
      blocking: true,
      path: `auth/update/profilepic/`,
      method: "PUT",
      body: payload
    },
  });

export const getKycStatus = (payload) => (
  {
    type: types.GET_KYC_STATUS,
    meta: {
      async: true,
      blocking: true,
      path: `customer/kyc/status`,
      method: "get"
    },
  });
export const getCommission = () => ({
  type: types.GET_COMMISSION,
  meta: {
    async: true,
    blocking: true,
    path: `/admin/commission`,
    method: "GET",
  },
});