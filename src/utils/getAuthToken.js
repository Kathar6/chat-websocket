import cookie from "cookie";

/**
 *
 * @param {import("express").Request} req
 * @returns {string | null} token or null if not found
 */
const getAuthToken = (req) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  console.log(cookies);
  if (req.cookies && req.cookies.auth) return req.cookies.auth;
  if (req.headers.authorization) return req.headers.authorization;
  if (req.query?.token) return req.query.token;
  return null;
};

export default getAuthToken;
