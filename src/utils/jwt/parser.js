import { jwtVerify } from "jose";

class TokenParser {
  token = null;
  secret = null;
  constructor(token) {
    this.secret = process.env.JWT_SECRET;
    this.token = token;
  }

  parse() {
    try {
      // Enconde the secret
      const encoder = new TextEncoder();
      const secretEncoded = encoder.encode(this.secret);
      return jwtVerify(this.token, secretEncoded);
    } catch (err) {
      return null;
    }
  }
}

export default TokenParser;
