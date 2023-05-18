// Models
import UserModel from "../models/users.js";

// Utils
import TokenParser from "../utils/jwt/parser.js";
import getAuthToken from "../utils/getAuthToken.js";

/**
 *
 * @param {import("express").Response} res
 */
const sendUnAuthorizedResponse = (res) => {
  return res.errorMessage(
    401,
    "You need to be logged in, in order to access this view"
  );
};

/**
 * Validate token by userId get by subject parameter
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const authMiddleware = async (req, res, next) => {
  const auth = getAuthToken(req);
  if (!auth) return sendUnAuthorizedResponse(res);

  const parser = new TokenParser(auth);

  try {
    // Getting the user id
    const parsedToken = await parser.parse();
    const userId = parsedToken.payload?.sub;

    const user = await UserModel.findById(userId).exec();
    if (!user) return sendUnAuthorizedResponse(res);

    res.locals.user = {
      _id: user._id,
      email: user.email,
    };

    next();
  } catch (error) {
    return res.errorMessage(400, "An error occurred while validating the user");
  }
};

export default authMiddleware;
