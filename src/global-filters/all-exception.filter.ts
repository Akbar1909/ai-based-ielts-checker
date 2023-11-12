import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { ValidationError } from 'class-validator';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private configService: ConfigService;
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    this.configService = new ConfigService();
  }

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const validationExceptionObject = this.prepareValidationErrorObj(exception);

    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      ...(this.isCustomException(exception) && {
        error: exception.response,
      }),
      ...(!isProduction && {
        stacktrace: exception?.stack,
        validation: validationExceptionObject,
      }),
      message: exception.response?.message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private prepareValidationErrorObj(exception: any) {
    const output = [];
    const { message: messages = [] } = exception.response || { message: [] };

    for (const message of messages) {
      if (message instanceof ValidationError) {
        output.push({
          sentValue: message.value,
          constraints: Object.values(message.constraints || {}),
        });
      }
    }

    return output;
  }

  private isCustomException(exception: any) {
    return (
      exception instanceof ConflictException ||
      exception instanceof BadRequestException
    );
  }
}
