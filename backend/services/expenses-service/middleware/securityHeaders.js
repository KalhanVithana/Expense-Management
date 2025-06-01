export const securityHeaders = (response) => ({
  ...response,
  headers: {
    ...(response.headers || {}),
    "Content-Type": "application/json",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
  },
});
