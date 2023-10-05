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
    return {
      code: 400,
      error: "An error occurred while validating the user",
    };
  }

  getResponse() {
    if (!this.error) return this._getDefaultResponse();

    let response = errorsCommand[this.error.code];

    if (!response) response = this._getDefaultResponse();
    return response;
  }
}

export default JWTErrorHandler;
