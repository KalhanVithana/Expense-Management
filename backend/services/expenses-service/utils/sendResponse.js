export const sendResponse = (res, response) => {
  res.status(response.statusCode).set(response.headers).send(response.body);
};