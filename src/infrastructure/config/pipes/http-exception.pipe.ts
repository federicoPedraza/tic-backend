import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    console.log('exception', exception);

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      response
        .status(status)
        .json(
          typeof exceptionResponse === 'string'
            ? { message: exceptionResponse }
            : exceptionResponse,
        );
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }
}
