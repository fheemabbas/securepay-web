const safeJSONParser = json => {
  try {
    return JSON.parse(json);
  } catch (err) {
    return json;
  }
};

export const getItem = key => {
  return safeJSONParser(window.localStorage.getItem(key));
};

export const setItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = key => {
  window.localStorage.removeItem(key);
};

export const clear = () => {
  window.localStorage.clear();
};

export const getSessionItem = key => {
  return safeJSONParser(window.sessionStorage.getItem(key));
};

export const setSessionItem = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value));
};

export const removeSessionItem = key => {
  window.sessionStorage.removeItem(key);
};
export default { getItem, setItem, removeItem, getSessionItem, setSessionItem, removeSessionItem, clear };
