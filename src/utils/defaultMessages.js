export const successMessage = (message) => ({
  OK: true,
  message,
});

export const errorMessage = (message) => ({
  OK: false,
  error: message,
});
