export const NOTIFICATION_COLORS = {
  ERROR: 'red',
  SUCCESS: 'green',
  WARNING: 'yellow'
} as const;

export const NOTIFICATION_ICONS = {
  ERROR: 'mdi-alert-circle-outline',
  SUCCESS: 'mdi-check',
  WARNING: 'mdi-alert'
} as const;

export const NOTIFICATION_MESSAGES = {
  ERROR: {
    SOMETHING_WENT_WRONG: 'Something went wrong, please contact the admin.'
  },
  SUCCESS: {

  }
} as const;

export const NOTIFICATION_TIMEOUT = 3000 as const;
