import * as types from "./types";

export const login = (payload) => ({
  type: types.LOGIN,
  meta: {
    async: true,
    blocking: true,
    path: "auth/login",
    method: "POST",
    body: payload,
  },
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const authenticated = () => ({
  type: types.AUTHENTICATED,
});

export const initializeSession = (payload) => ({
  type: types.INITIALIZE,
  payload,
});

export const destroySession = () => ({
  type: types.DESTROY,
});

export const refreshToken = () => ({
  type: types.REFRESH_TOKEN,
});

export const forgotPassword = (payload) => ({
  type: types.FORGOT_PASSWORD,
  meta: {
    async: true,
    blocking: true,
    path: "auth/forgot-password",
    method: "POST",
    body: payload,
  },
});

export const resetPassword = (payload, token) => ({
  type: types.RESET_PASSWORD,
  meta: {
    async: true,
    blocking: true,
    path: `auth/reset-password?token=${token}`,
    method: "POST",
    body: payload,
  },
});
export const setPassword = (payload, token) => ({
  type: types.RESET_PASSWORD,
  meta: {
    async: true,
    blocking: true,
    path: `admin/setPassword?token=${token}`,
    method: "POST",
    body: payload,
  },
});

export const verifyResetPasswordLink = (token) => ({
  type: types.VERIFY_RESET_PASSWORD_LINK,
  meta: {
    async: true,
    blocking: true,
    path: `auth/checkResetLink?token=${token}`,
    method: "GET"
  },
});
export const verifySetPasswordLink = (token) => ({
  type: types.VERIFY_RESET_PASSWORD_LINK,
  meta: {
    async: true,
    blocking: true,
    path: `admin/checkToken?token=${token}`,
    method: "GET"
  },
});
export const signupWithEmail = (payload) => ({
  type: types.SIGNUP_WITH_EMAIL,
  meta: {
    async: true,
    blocking: true,
    path: `auth/register`,
    method: "POST",
    body: payload
  },
});

export const signupWithEmailProcess = (payload, userID) => (
  {
    type: types.SIGNUP_PROCESS,
    meta: {
      async: true,
      blocking: true,
      path: `auth/register?userId=${userID}`,
      method: "POST",
      body: payload,
    },
  });

export const verifyEmailLink = (token) => ({
  type: types.VERIFY_EMAIL_LINK,
  meta: {
    async: true,
    blocking: true,
    path: `auth/user-verify/?token=${token}`,
    method: "GET"
  },
});

export const setUser = (payload) => ({
  type: types.SET_USER,
  payload
});

export const loginWithFaceBookSocial = (payload) => ({
  type: types.LOGIN_WITH_SOCIAL,
  meta: {
    async: true,
    blocking: true,
    path: `auth/with-facebook`,
    method: "POST",
    body: payload
  },
});

export const loginWithGoogleSocial = (payload) => ({
  type: types.LOGIN_WITH_SOCIAL,
  meta: {
    async: true,
    blocking: true,
    path: `auth/with-gmail`,
    method: "POST",
    body: payload
  },
});

export const changePassword = (userID, payload) => ({
  type: types.CHANGE_PASSWORD,
  meta: {
    async: true,
    blocking: true,
    path: `/auth/${userID}/change-password`,
    method: "PATCH",
    body: payload,
  },
});

export const updateCompanyInformation = (payload) => ({
  type: types.UPDATE_COMPANY_INFORMATION,
  meta: {
    async: true,
    blocking: true,
    path: `/customer/update/companyinfo`,
    method: "PUT",
    body: payload
  },
});

export const uboDeclaration = (payload) => ({
  type: types.UBO_DECLARATION,
  meta: {
    async: true,
    blocking: true,
    path: `/customer/add/addubo`,
    method: "PUT",
    body: payload
  },
});

export const updateUbo = (payload) => ({
  type: types.UPDATE_UBO,
  meta: {
    async: true,
    blocking: true,
    path: `/customer/update/updateubo`,
    method: "PUT",
    body: payload
  },
});

export const verifyAuthOTP = (payload, token) => ({
  type: types.VERIFY_LOGIN_OTP,
  meta: {
    async: true,
    blocking: true,
    path: `auth/verify/otp`,
    method: "PUT",
    body: payload,
  },
});
export const resendVerifyLink = (userid) => ({
  type: types.RESEND_VERIFY_LINK,
  meta: {
    async: true,
    blocking: true,
    path: `auth/resend-verify-link?userId=${userid}`,
    method: "post"
  },
});
export const invitaUser = (payload) => ({
  type: types.INVITA_CUSTOMER,
  meta: {
    async: true,
    blocking: true,
    path: `customer/invite`,
    method: "post",
    body: payload,
  },
});


