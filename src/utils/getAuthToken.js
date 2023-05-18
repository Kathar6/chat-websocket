/**
 *
 * @param {import("express").Request} req
 * @returns {string | null} token or null if not found
 */
const getAuthToken = (req) => {
  if (req.cookies && req.cookies.auth) return req.cookies.auth;
  if (req.headers.authorization) return req.headers.authorization;
  if (req.query?.token) return req.query.token;
  return null;
};

export default getAuthToken;
