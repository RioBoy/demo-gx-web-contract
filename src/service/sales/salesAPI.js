import { _shapeMethodGet, _shapeMethodPost } from '../api/_config';
import {
  SrvProspectCreateContract,
  SrvProspectGenerateLinkContract,
} from '../api/_endPoint';

export const generateProspectLinkContract = (serviceLocId) =>
  _shapeMethodGet(
    SrvProspectGenerateLinkContract(serviceLocId),
    'tcGenerateProspectContract',
  );

export const createProspectContract = (formRequest = {}) =>
  _shapeMethodPost(SrvProspectCreateContract, formRequest, false, '', true);
