export const getErrorMessage = (error: unknown, defaultMessage = 'An error occurred'): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return defaultMessage;
};

