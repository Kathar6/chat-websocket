import { DefaultResponse } from "../utils/index.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const responseMiddleware = (req, res, next) => {
  /**
   * @param {string} status
   */
  const formatter = (status) => {
    const handler = new DefaultResponse(status);

    handler.send = () => {
      handler._prepareResponse();
      return res.status(handler._status).json(handler.response);
    };

    return handler;
  };

  res.response = formatter;

  next();
};

export default responseMiddleware;
