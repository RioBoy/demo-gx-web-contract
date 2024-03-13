const baseAPI = process.env.salesManagement.DEVELOPMENT.baseAPI;

export const baseAPIPublic = baseAPI + '/api/public/v1/sales-managements';
export const baseAPISalesManagementMobile =
  baseAPI + '/api/mobile/v1/sales-managements';

export const SrvProspectCreateContract = baseAPIPublic + '/contracts';

export const SrvProspectGenerateLinkContract = (serviceLocId) =>
  baseAPISalesManagementMobile +
  '/prospects/service-location/' +
  serviceLocId +
  '/contract/generate-link';
