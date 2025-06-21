export const NOTIFICATION_COLORS = {
  ERROR: 'red',
  SUCCESS: 'green',
  WARNING: 'yellow',
} as const;

export const NOTIFICATION_ICONS = {
  ERROR: 'mdi-alert-circle-outline',
  SUCCESS: 'mdi-check',
  WARNING: 'mdi-alert',
} as const;

export const NOTIFICATION_MESSAGES = {
  ERROR: {
    SOMETHING_WENT_WRONG: 'Something went wrong, please contact the admin.',
  },
  SUCCESS: {
    PRODUCT_ADDED: 'The product has been added successfully.',
    PRODUCT_DELETED: 'The product has been deleted successfully.',
    PRODUCT_UPDATED: 'The product has been updated successfully.',
  },
  WARNING: {
    NEW_PRODUCT_DATA: 'The new product data is empty or missing something.',
    EDITED_PRODUCT_DATA: 'The edited product data is empty or still equal.',
    PLEASE_REVIEW_YOUR_INFORMATION: 'Please review your information.',
  },
} as const;

export const NOTIFICATION_TIMEOUT = 3000 as const;
