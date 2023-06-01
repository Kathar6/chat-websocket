import { v4 as uuidv4 } from "uuid";

// Models
import UserModel from "../models/users.js";

// Utils
import {
  errorMessage,
  successMessage,
  hashPassword,
  comparePasswords,
} from "../utils/index.js";
import TokenSigner from "../utils/jwt/signer.js";
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
      res.cookie("auth", token, config);
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

    // Check if passwords match
    if (password !== confirmPassword)
      return res.errorMessage(400, "Passwords do not match");

    // Find if user already exists
    const userFound = await UserModel.findOne({ email }).exec();

    if (userFound)
      return res.status(409).json(errorMessage("User already exists"));

    const hashedPassword = await hashPassword(password);

    const newUser = new UserModel({
      _id: uuidv4(),
      email,
      password: hashedPassword,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    await newUser.save();

    return res.status(201).json(successMessage("User saved successfully"));
  }
}

export default new AuthController();
