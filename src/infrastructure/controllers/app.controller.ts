import { Controller, Get, HttpStatus } from '@nestjs/common';
import { GetTime } from './app.presentations';
import { HttpResponse } from './base.response';
import { GetTimeError } from 'src/application/exceptions';

@Controller()
export class AppController {
  @Get('/')
  getTime(): HttpResponse<GetTime> {
    return {
      message: 'Server is up and running',
      data: {
        time: new Date(),
      },
      status: HttpStatus.OK,
    };
  }

  @Get('/error')
  getError(): HttpResponse<GetTime> {
    throw new GetTimeError();
  }
}
