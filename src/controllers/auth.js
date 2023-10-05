// Utils
import AuthService from "../services/auth.js";

/**
 *
 * @param {import("express").Response} res
 * @param {any} token
 */
class AuthController {
  /**
   * Login with email and password
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns authentication token
   */
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const service = new AuthService();

      const { token, config } = await service.signin({ email, password });

      res.cookie(process.env.AUTH_COOKIE_NAME, token, config);

      const data = {
        token,
      };

      const response = res.response(200).setData(data).setMessage("Logged in");

      return response.send();
    } catch (error) {
      console.error(error);
      return res.response(400).setError(error).send();
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns
   */
  async register(req, res) {
    const { email, password, "confirm-password": confirmPassword } = req.body;

    try {
      const service = new AuthService();
      await service.register({
        email,
        password,
        "confirm-password": confirmPassword,
      });

      // return res.successMessage(200, "User saved successfully");
      return res.response(200).setMessage("User saved successfully").send();
    } catch (error) {
      const code = error.statusCode ?? 400;
      const message = error.message;
      return res.response(code).setError(message).send();
    }
  }
}

export default new AuthController();
