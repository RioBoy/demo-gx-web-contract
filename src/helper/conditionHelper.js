export const isSuccess = (resData) =>
  resData && resData.status && resData.status.code == 200;

export const isWindowUndefined = () => typeof window === 'undefined';
