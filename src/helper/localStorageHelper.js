import { isWindowUndefined } from './conditionHelper';

let window = {};

export const setLocalStorage = (key, value) => {
  if (!isWindowUndefined()) {
    return window?.localStorage?.setItem(key, value);
  }

  return window;
};

export const getLocalStorage = (key) => {
  if (!isWindowUndefined()) {
    return window?.localStorage?.getItem(key);
  }

  return window;
};

export const clearLocalStorage = (key) => {
  if (!isWindowUndefined()) {
    return window?.localStorage?.removeItem(key);
  }

  return window;
};
