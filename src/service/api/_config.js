import axios from 'axios';
import * as _ from 'lodash';
import * as api from '@/helper/apiHelper';
import { isSuccess } from '@/helper/conditionHelper';

export const _configHeadBody = () => ({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
});

export const _shapeMethodGet = (url, tokenCancel = '', isMsgCatch = true) => {
  const others = tokenCancel ? { ...api.useCancelToken(tokenCancel) } : {};

  return api
    .get(url, others, _configHeadBody())
    .then((res) => {
      if (isSuccess(res.data)) {
        return res.data;
      } else {
        return null;
      }
    })
    .catch((err) => {
      if (err && err.response && err.response.status === 401) {
        // isTokenExpired();
      } else {
        // notify.error(err.message)
        if (isMsgCatch) {
          if (_.isEmpty(tokenCancel) || api.argCatchMsg(err)) {
            //  notify.error(err.message)
          } else {
            //  return api.argCancelToken(err)
          }
        }
      }
    });
};

export const _shapeMethodPost = (
  url,
  payload = {},
  isMsgSuccess = true,
  tokenCancel = '',
  isFormData = false,
) => {
  const others = tokenCancel ? {} : {};
  others['validateStatus'] = (status) => {
    return true; // I'm always returning true, you may want to do it depending on the status received
  };

  const newConfigHeads = {};
  if (isFormData) {
    newConfigHeads['Content-Type'] = 'multipart/form-data';
  }

  return api
    .post(url, payload, others, {
      ..._configHeadBody(),
      ...newConfigHeads,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err && err.response && err.response.status === 401) {
        // isTokenExpired();
      } else {
        if (tokenCancel && api.argCatchMsg(err)) {
          //    notify.error(err.message)
          // notifyError(err.message);
        } else {
          // return api.argCancelToken(err)
        }
      }
    });
};
