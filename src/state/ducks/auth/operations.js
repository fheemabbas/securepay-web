import {
  login as loginAction,
  logout as logoutAction,
  refreshToken,
  resetPassword,
  authenticated,
  destroySession,
  forgotPassword,
  initializeSession,
  resendVerifyLink,
  verifyResetPasswordLink, verifyEmailLink, setUser, loginWithGoogleSocial, loginWithFaceBookSocial, verifySetPasswordLink, setPassword, verifyAuthOTP, invitaUser
} from "./actions";

const login = (payload) => {
  return async (dispatch) => {
    let response = await dispatch(loginAction(payload));
    return response;
  };
};

const logout = (payload) => {
  return async (dispatch) => {
    await dispatch(logoutAction());
    await dispatch(destroySession());
  };
};

export {
  login,
  logout,
  refreshToken,
  resetPassword,
  authenticated,
  destroySession,
  forgotPassword,
  initializeSession,
  resendVerifyLink,
  verifyResetPasswordLink, verifyEmailLink, setUser, loginWithGoogleSocial, loginWithFaceBookSocial, verifySetPasswordLink, setPassword, verifyAuthOTP,
  invitaUser
};
