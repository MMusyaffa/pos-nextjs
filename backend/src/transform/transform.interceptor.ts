import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface ResponseSuccess<T> {
  success?: boolean;
  message: string;
  data?: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseSuccess<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseSuccess<T>> {
    return next
      .handle()
      .pipe(
        map(data => {
          const response: ResponseSuccess<T> = {
            success: true,
            message: data.message || 'Request successful',
            data: data.data || [],
          }
          return response;
        }),
      );
  }
}
