import TokenParser from "../utils/jwt/parser.js";
import UserModel from "../models/users.js";
import JWTErrorHandler from "../utils/jwt/errorHandler.js";

class WebSocketAuthenticator {
  /**
   * @param {import("http").IncomingHttpHeaders} headers
   */
  constructor(headers) {
    const token = this._getToken(headers);

    this.token = token;
  }

  async _decodeToken() {
    const decoder = new TokenParser(this.token);

    try {
      const payload = await decoder.parse();

      const userID = payload.payload.sub;

      return userID;
    } catch (error) {
      const jwtError = new JWTErrorHandler(error);

      const errorMessage = jwtError.getResponse();
      console.error(
        "\x1b[31m",
        errorMessage.error,
        "token: ",
        this.token,
        "\x1b[0m",
      );
      return false;
    }
  }

  /**
   * @param {import("http").IncomingHttpHeaders} headers
   */
  _getToken(headers) {
    const raw_protocol = headers["sec-websocket-protocol"];
    if (!raw_protocol) return "";
    const protocols = raw_protocol.split(",");
    return protocols[0];
  }

  /**
   * @returns {Promise<{isValid: boolean, id?: string}>} isAuthenticated
   */
  async authenticate() {
    const userID = await this._decodeToken();

    if (userID === false)
      return {
        isValid: false,
      };

    const userInfo = await UserModel.findOne({ _id: userID }).exec();
    return {
      isValid: userInfo !== null,
      id: userInfo?._id,
    };
  }
}

export default WebSocketAuthenticator;
