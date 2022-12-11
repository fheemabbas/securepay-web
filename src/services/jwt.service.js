const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const getToken = () => {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const saveToken = token => {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token.access.token);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, token.refresh.token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken, getRefreshToken };
