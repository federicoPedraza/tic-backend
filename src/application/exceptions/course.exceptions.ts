import { HttpException, HttpStatus } from '@nestjs/common';

export class CourseNotFound extends HttpException {
  constructor() {
    super(
      {
        message: 'Course not found',
        status: HttpStatus.NOT_FOUND,
        code: 'COURSE_NOT_FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class AlreadyParticipant extends HttpException {
  constructor() {
    super(
      {
        message: 'User is already a participant',
        status: HttpStatus.CONFLICT,
        code: 'ALREADY_PARTICIPANT',
      },
      HttpStatus.CONFLICT,
    );
  }
}
