const errorsCommand = {
  ERR_JWT_EXPIRED: {
    code: 401,
    error: "The token has been expired.",
  },
  ERR_JWT_INVALID: {
    code: 401,
    error: "The token is invalid.",
  },
};

class JWTErrorHandler {
  /**
   * @param {Error} error
   */
  constructor(error) {
    this.error = error;
  }

  _getDefaultResponse() {
    return [400, "An error occurred while validating the user"];
  }

  getResponse() {
    if (!this.error) return this._getDefaultResponse();

    const response =
      errorsCommand[this.error.code] || this._getDefaultResponse();

    return response;
  }
}

export default JWTErrorHandler;
