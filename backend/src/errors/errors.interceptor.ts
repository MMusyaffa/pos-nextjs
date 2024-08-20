import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

export interface ResponseError {
  success: boolean;
  message: string;
  errors: string[];
}

@Injectable()
export class ErrorsInterceptor implements NestInterceptor<ResponseError> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseError> {
    return next
      .handle()
      .pipe(
        catchError(err => {
          const response: ResponseError = {
            success: false,
            message: err.response.error || 'Request failed',
            errors: err.response.message,
          }
          err.response = response;
          return throwError(() => err);
        }),
      );
  }
}
