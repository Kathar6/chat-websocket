import { errorMessage, successMessage } from "../utils/index.js"

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const responseMiddleware = (req, res, next) => {
  res.successMessage = (code = 200, message = "") => {
    return res.status(code).json(successMessage(message))
  }
  res.errorMessage = (code = 400, message = "") => {
    return res.status(code).json(errorMessage(message))
  }
  next()
}

export default responseMiddleware
