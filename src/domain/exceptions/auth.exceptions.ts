import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidPasswordOrEmail extends HttpException {
  constructor() {
    super(
      {
        message: 'Invalid email or password',
        status: HttpStatus.UNAUTHORIZED,
        code: 'INVALID_EMAIL_OR_PASSWORD',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class UserNotFound extends HttpException {
  constructor() {
    super(
      {
        message: 'User not found',
        status: HttpStatus.NOT_FOUND,
        code: 'USER_NOT_FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class UserAlreadyExists extends HttpException {
  constructor() {
    super(
      {
        message: 'User already exists',
        status: HttpStatus.CONFLICT,
        code: 'USER_ALREADY_EXISTS',
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class ForbiddenResource extends HttpException {
  constructor() {
    super(
      {
        message: 'Forbidden resource',
        status: HttpStatus.FORBIDDEN,
        code: 'FORBIDDEN_RESOURCE',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
