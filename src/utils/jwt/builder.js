import { SignJWT } from "jose";

class TokenBuilder {
  payload = null;
  auth = null;
  secret = null;

  constructor(payload, expiration = process.env.JWT_EXP) {
    this.payload = payload;
    this.expiration = expiration;
    this.algo = process.env.JWT_ALGO;
    this.secret = process.env.JWT_SECRET;
  }

  async build() {
    const encoder = new TextEncoder();
    this.secret = encoder.encode(this.secret);
    this.auth = new SignJWT(this.payload)
      .setProtectedHeader({ alg: this.algo })
      .setIssuedAt()
      .setExpirationTime(this.expiration);
    return this;
  }

  async sign() {
    await this.auth.sign(this.secret);
  }
}

export default TokenBuilder;
