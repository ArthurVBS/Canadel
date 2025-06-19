export const BASE_ROUTES = {
  PRODUCT: '/product'
} as const;

export const HTTP_METHODS = {
  DELETE: 'delete',
  GET: 'get',
  POST: 'post',
  PUT: 'put'
} as const;

export const HTTP_END_POINTS = {
  ALL: '/all',
  ADD: '/add',
  ID: '/{id}'
} as const;
