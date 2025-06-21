export const ACTION = {
  LOADING: {
    HIDE: 'hide',
    SHOW: 'show',
  },
  NOTIFICATION: {
    HIDE: 'hide',
    SHOW_ERROR: 'showError',
    SHOW_SUCCESS: 'showSuccess',
    SHOW_WARNING: 'showWarning',
  },
  PRODUCTS: {
    ADD_OR_UPDATE_PRODUCT: 'addOrUpdateProduct',
    CLEAR: 'clear',
    REMOVE_PRODUCT: 'removeProduct',
    SET_PRODUCTS: 'setProducts',
  },
} as const;

export const GETTER = {
  LOADING: {
    SHOW: 'show',
  },
  NOTIFICATION: {
    COLOR: 'color',
    ICON: 'icon',
    SHOW: 'show',
    TEXT: 'text',
  },
  PRODUCTS: {
    PRODUCT: 'product',
    PRODUCTS: 'products',
  },
} as const;

export const MODULE = {
  LOADING: 'loading/',
  NOTIFICATION: 'notification/',
  PRODUCTS: 'product/',
} as const;

export const MUTATION = {
  LOADING: {
    SET_SHOW_FALSE: 'setShowFalse',
    SET_SHOW_TRUE: 'setShowTrue',
  },
  NOTIFICATION: {
    SET_COLOR: 'setColor',
    SET_ICON: 'setIcon',
    SET_SHOW_FALSE: 'setShowFalse',
    SET_SHOW_TRUE: 'setShowTrue',
    SET_TEXT: 'setText',
  },
  PRODUCTS: {
    ADD_OR_UPDATE_PRODUCT: 'addOrUpdateProduct',
    CLEAR: 'clear',
    REMOVE_PRODUCT: 'removeProduct',
    SET_PRODUCTS: 'setProducts',
  },
} as const;
