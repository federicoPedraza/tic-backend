export class InvalidPassword extends Error {
  constructor() {
    super('Invalid password');
  }
}

export class UserNotFound extends Error {
  constructor() {
    super('User not found');
  }
}
