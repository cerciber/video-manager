// Imports
const bcrypt = require('bcrypt');
const config = require('@src/utils/statics/config');

// Entity
class AuthUser {
  #id;

  #username;

  #password;

  constructor(id, username, password, encrypted) {
    this.#id = id;
    this.#username = username;
    this.setPassword(password, encrypted);
  }

  get id() {
    return this.#id;
  }

  set id(newId) {
    this.#id = newId;
  }

  get username() {
    return this.#username;
  }

  set username(newUsername) {
    this.#username = newUsername;
  }

  getPassword() {
    return this.#password;
  }

  setPassword(newPassword, encrypted) {
    if (encrypted) {
      this.#password = newPassword;
    } else {
      this.#password = bcrypt.hashSync(
        newPassword,
        config.entities.passwordEncryptSaltRounds
      );
    }
  }

  async comparePassword(otherPassword) {
    return bcrypt.compare(otherPassword, this.#password);
  }
}

// Exports
module.exports = AuthUser;
