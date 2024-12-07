import { HttpException, HttpStatus } from '@nestjs/common';

export class GetTimeError extends HttpException {
  constructor() {
    super(
      {
        message: 'Error getting time',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        code: 'GET_TIME_ERROR',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
