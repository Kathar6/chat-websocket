// Utils
import TokenParser from "../utils/jwt/parser.js"

/**
 * Validate token by subject
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const authMiddleware = (req, res, next) => {
  const { auth } = req.cookies
  if (!auth)
    res.errorMessage(
      401,
      "You need to be logged in, in order to access this view"
    )

  const parser = new TokenParser(auth)

  next()
}
