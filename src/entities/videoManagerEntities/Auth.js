// Imports
const jwt = require('jsonwebtoken');
const config = require('@src/utils/statics/config');

// Entity
class Auth {
  #sectetKey;

  #duration;

  constructor() {
    this.#sectetKey = config.application.jwtSectetKey;
    this.#duration = config.application.jwtDuration;
  }

  generateToken(payload) {
    return jwt.sign(payload, this.#sectetKey, {
      expiresIn: this.#duration,
    });
  }

  decodeToken(token) {
    try {
      const decodedToken = jwt.verify(token, this.#sectetKey);
      return decodedToken;
    } catch (err) {
      return undefined;
    }
  }
}

// Exports
module.exports = Auth;
