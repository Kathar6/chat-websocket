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
      return res.successMessage(200, "Logged in");
    } catch (error) {
      return res.errorMessage(400, error);
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

      return res.successMessage(200, "User saved successfully");
    } catch (error) {
      const code = error.code ?? 400;
      const message = error.message;
      return res.errorMessage(code, message);
    }
  }
}

export default new AuthController();
