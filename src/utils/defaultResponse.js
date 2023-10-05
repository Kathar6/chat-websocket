class DefaultResponse {
  _status = null;
  _statusMessage = "error";
  _data = null;
  _message = null;
  _error = null;
  response = {};

  /**
   * The API response standard
   * @param {number} status
   */
  constructor(status) {
    if (status < 100 || status > 599)
      throw new Error("Status code not supported in standard");

    this._status = status;
    this._statusMessage = this._getStatus(status);
  }

  /**
   * @param {number} status
   */
  _getStatus(status) {
    if (status >= 100 && status < 200) return "information";

    if (status < 300) return "success";

    if (status < 400) return "redirection";

    if (status < 600) return "error";

    return "unrecognized";
  }

  /**
   * @param {Record<any, any>} data
   */
  setData(data) {
    this._data = data;

    return this;
  }

  /**
   * @param {string} message
   */
  setMessage(message) {
    this._message = message;
    return this;
  }

  /**
   * @param {any} error
   */
  setError(error) {
    if (this._status < 400 || this._status > 599)
      console.warn(
        "The error message must exclusively in responses with http error codes"
      );

    this._error = error;

    return this;
  }

  _prepareResponse() {
    const response = {
      status: this._statusMessage,
    };

    if (this._data) response.data = this._data;

    if (this._message) response.message = this._message;

    if (this._error) response.error = this._error;

    this.response = response;
  }

  getResponse() {
    this._prepareResponse();

    return {
      statusCode: this._status,
      response: this.response,
    };
  }
}

export default DefaultResponse;
