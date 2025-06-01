export const successResponse = (data = {}, statusCode = 200) => ({
  statusCode,
  body: JSON.stringify({ success: true, data }),
});

export const errorResponse = (message = "Internal Server Error", statusCode = 500) => ({
  statusCode,
  body: JSON.stringify({ success: false, message }),
});
