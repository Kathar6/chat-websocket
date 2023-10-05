import cookie from "cookie";
class BearerTokenStrategy {
  /**
   * @param {import("express").Request} request
   * @returns {string} token
   */
  _getToken(request) {
    const bearerToken = request.headers.authorization;

    return bearerToken;
  }

  /**
   * @param {import("express").Request)} request
   */
  execute(request) {
    const token = this._getToken(request);
    const formattedToken = token.split("Bearer ");

    return formattedToken[1];
  }
}

class CookieTokenStrategy {
  /**
   * @param {import("express").Request} request
   * @returns {string} token
   */
  _getToken(request) {
    const cookies = cookie.parse(request.headers.cookie || "");

    const token = cookies[process.env.AUTH_COOKIE_NAME];

    return token;
  }

  /**
   * @param {import("express").Request)} request
   */
  execute(request) {
    const token = this._getToken(request);

    return token;
  }
}

class QueryParamTokenStrategy {
  /**
   * @param {import("express").Request} request
   * @returns {string} token
   */
  _getToken(request) {
    const token = request.query.token;

    return token;
  }
  /**
   * @param {import("express").Request)} request
   */
  execute(request) {
    const token = this._getToken(request);

    return token;
  }
}

class TokenRetreiver {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  /**
   * @param {import("express").Request} request
   */
  retreive(request) {
    return this.strategy.execute(request);
  }
}
/**
 *
 * @param {import("express").Request} req
 * @returns {string | null} token or null if not found
 */
const getAuthToken = (req) => {
  const context = new TokenRetreiver(new CookieTokenStrategy());

  const cookies = cookie.parse(req.headers.cookie || "");
  const cookieToken = cookies[process.env.AUTH_COOKIE_NAME];

  if (cookieToken) return context.retreive(req);

  if (req.headers.authorization) {
    context.setStrategy(new BearerTokenStrategy());
    return context.retreive(req);
  }
  if (req.query?.token) {
    context.setStrategy(new QueryParamTokenStrategy());
    return context.retreive(req);
  }
  return null;
};

export default getAuthToken;
