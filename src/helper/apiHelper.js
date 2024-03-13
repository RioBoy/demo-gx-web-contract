import axios from 'axios';

const keyCancel = {};
const CancelToken = axios.CancelToken;

export function useCancelToken(parentName) {
  if (keyCancel[parentName]) {
    keyCancel[parentName]();
  }

  return {
    cancelToken: new CancelToken(function executor(c) {
      keyCancel[parentName] = c;
    }),
  };
}

export function argCatchMsg(err = {}) {
  if (err !== null && err.message && err.message !== undefined) {
    return true;
  }
  return false;
}

export const configMethod = (method, url, headers = {}, others = {}) => {
  return axios({
    method,
    url,
    headers: { ...headers },
    withCredentials: false,
    ...others,
  });
};

export const get = (url, others = {}, headers = {}) =>
  configMethod('GET', url, headers, others);

export const post = (url, payload, others = {}, headers = {}) => {
  return configMethod('POST', url, headers, { data: payload, ...others });
};
