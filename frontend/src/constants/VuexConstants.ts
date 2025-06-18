export const ACTION = {
  LOADING: {
    HIDE: 'hide',
    SHOW: 'show'
  }
} as const;

export const GETTER = {
  LOADING: {
    SHOW: 'show'
  }
} as const;

export const MODULE = {
  LOADING: 'loading/'
} as const;

export const MUTATION = {
  LOADING: {
    SET_SHOW_FALSE: 'setShowFalse',
    SET_SHOW_TRUE: 'setShowTrue'
  }
} as const;
