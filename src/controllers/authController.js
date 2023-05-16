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

class AuthController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns
   */
  async login(req, res) {
    const { email, password } = req.body;

    // Find if the user does not exist
    const userFound = await UserModel.findOne({ email }).exec();

    if (!userFound) return res.errorMessage(400, "User not found");

    const isSamePassword = await comparePasswords(password, userFound.password);

    if (!isSamePassword) return res.errorMessage(400, "Password mismatch");

    return res.send("OK");
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns
   */
  async register(req, res) {
    const { email, password } = req.body;

    // Find if the user already exists
    const userFound = await UserModel.findOne({ email }).exec();

    if (userFound)
      return res.status(409).json(errorMessage("User already exists"));

    const hashedPassword = await hashPassword(password);

    const newUser = new UserModel({
      _id: uuidv4(),
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json(successMessage("User saved successfully"));
  }
}

export default new AuthController();
