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

class AuthController {
  /**
   * Login with email and password
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns authentication token
   */
  async login(req, res) {
    const { email, password } = req.body;

    // Find if the user does not exist
    const userFound = await UserModel.findOne({ email }).exec();

    if (!userFound) return res.errorMessage(400, "User not found");

    const isSamePassword = await comparePasswords(password, userFound.password);

    if (!isSamePassword) return res.errorMessage(400, "Password mismatch");

    // Create token and retrieve to user
    const signer = new TokenSigner({
      sub: userFound._id,
    });
    signer.build();
    const token = await signer.sign();

    res.cookie("auth", token, {
      httpOnly: true,
    });
    return res.successMessage(200, "Logged in");
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns
   */
  async register(req, res) {
    const { email, password } = req.body;

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
