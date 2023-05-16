import { jwtVerify } from "jose";

class TokenParser {
  token = null;
  secret = null;
  constructor(token) {
    this.secret = process.env.JWT_SECRET;
    this.token = token;
  }
}

export default TokenParser;
