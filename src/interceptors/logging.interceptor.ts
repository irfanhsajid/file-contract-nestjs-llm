import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class GraphQLLoggingInterceptor implements NestInterceptor {
  private logger = new Logger('GraphQL');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType<string>() !== 'graphql') {
      return next.handle();
    }

    try {
      const ctx = GqlExecutionContext.create(context);
      const info = ctx.getInfo();
      const resolverName = info?.parentType?.name || 'UnknownResolver';
      const fieldName = info?.fieldName || 'UnknownField';
      this.logger.log(`${resolverName}.${fieldName} was called`);
    } catch (e) {
      this.logger.error('LoggingInterceptor failed:', e);
    }

    return next.handle();
  }
}
