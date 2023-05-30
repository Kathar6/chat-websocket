// Models
import UserModel from "../models/users"

// Utils
import { comparePasswords } from "../utils"
import TokenSigner from "../utils/jwt/signer"

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
    if (!userFound) return false

    const isSamePassword = await comparePasswords(password, userFound.password)

    if (!isSamePassword) return false

    const signer = this.generateToken(userFound)
    const token = await this.getToken(signer)
    const config = this.getCookieConfig()
    return { token, config }
  }
}

export default AuthService()
