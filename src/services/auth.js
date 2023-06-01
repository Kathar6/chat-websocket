// Models
import UserModel from "../models/users.js"

// Utils
import { hashPassword, comparePasswords } from "../utils/index.js"
import TokenSigner from "../utils/jwt/signer.js"

// Vendor
import { v4 as uuidv4 } from "uuid"

class AuthService {
  /**
   * retrieve the cookie configuration
   * @returns {httpOnly: boolean, maxAge: number, domain: string, path: string, sameSite: string} cookie config
   */
  getCookieConfig() {
    return {
      httpOnly: true,
      maxAge: 3600,
      domain: process.env.FRONT_DOMAIN,
      path: "/",
      sameSite: "lax",
    }
  }

  /**
   * Generates a token
   * @param {*} user
   * @returns {TokenSigner} signer
   */
  generateToken(user) {
    const signer = new TokenSigner({
      sub: user._id,
    })
    signer.build()
    return signer
  }

  /**
   * Sign the token an retrieve it
   * @param {TokenSigner} signer
   * @returns {string} auth token
   */
  async getToken(signer) {
    const token = await signer.sign()
    return token
  }

  /**
   * Validates the user information and return the token and config to create a cookie
   * @param {{email: string, password: string}} data
   * @returns {{token: string, config: Record<string, any>}} token and config to generate the cookie
   */
  async signin(data) {
    const { email, password } = data

    const userFound = await UserModel.findOne({ email }).exec()
    if (!userFound) throw "User or password mismatch"
    const isSamePassword = await comparePasswords(password, userFound.password)

    if (!isSamePassword) throw "User or password mismatch"

    const signer = this.generateToken(userFound)
    const token = await this.getToken(signer)
    const config = this.getCookieConfig()
    return { token, config }
  }

  /**
   * @param {{email: string, password: string, 'confirm-password':string}} data
   * @returns {boolean} response indicating whether the user is registered successfully or an error occurred
   */
  async register(data) {
    const { email, password, "confirm-password": confirmPassword } = data

    // Check if passwords match
    if (password !== confirmPassword)
      throw {
        code: 400,
        message: "Passwords do not match",
      }

    // Find if user already exists
    const userFound = await UserModel.findOne({ email }).exec()

    if (userFound)
      throw {
        code: 409,
        message: "User already exists",
      }

    const hashedPassword = await hashPassword(password)

    const newUser = new UserModel({
      _id: uuidv4(),
      email,
      password: hashedPassword,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    await newUser.save()
    return true
  }
}

export default AuthService
