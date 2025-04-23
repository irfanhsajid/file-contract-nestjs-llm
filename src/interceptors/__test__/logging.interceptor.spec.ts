import { CallHandler, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { GraphQLLoggingInterceptor } from '../logging.interceptor';

describe('GraphQLLoggingInterceptor', () => {
  let interceptor: GraphQLLoggingInterceptor;
  let mockLogger: { log: jest.Mock; error: jest.Mock };

  beforeEach(async () => {
    mockLogger = { log: jest.fn(), error: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GraphQLLoggingInterceptor,
        {
          provide: 'Logger',
          useValue: mockLogger,
        },
      ],
    }).compile();

    interceptor = module.get<GraphQLLoggingInterceptor>(GraphQLLoggingInterceptor);
    (interceptor as any).logger = mockLogger; // Inject mock logger
  });

  it('should log the resolver and field name for GraphQL requests', () => {
    const mockExecutionContext = {
      getType: jest.fn().mockReturnValue('graphql'),
    } as unknown as ExecutionContext;

    const mockGqlContext = {
      getInfo: jest.fn().mockReturnValue({
        parentType: { name: 'Query' },
        fieldName: 'testField',
      }),
    };

    jest.spyOn(GqlExecutionContext, 'create').mockReturnValue(mockGqlContext as any);

    const mockCallHandler: CallHandler = {
      handle: jest.fn().mockReturnValue(of('test')),
    };

    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe();

    expect(mockLogger.log).toHaveBeenCalledWith('Query.testField was called');
  });

  it('should log the resolver and field name for GraphQL requests as undefined parentType and fieldName', () => {
    const mockExecutionContext = {
      getType: jest.fn().mockReturnValue('graphql'),
    } as unknown as ExecutionContext;

    const mockGqlContext = {
      getInfo: jest.fn().mockReturnValue({
        parentType: undefined,
        fieldName: undefined,
      }),
    };

    jest.spyOn(GqlExecutionContext, 'create').mockReturnValue(mockGqlContext as any);

    const mockCallHandler: CallHandler = {
      handle: jest.fn().mockReturnValue(of('test')),
    };

    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe();
    expect(mockLogger.log).toHaveBeenCalledWith('UnknownResolver.UnknownField was called');
  });

  it('should skip logging for non-GraphQL requests', () => {
    const mockExecutionContext = {
      getType: jest.fn().mockReturnValue('http'),
    } as unknown as ExecutionContext;

    const mockCallHandler: CallHandler = {
      handle: jest.fn().mockReturnValue(of('test')),
    };

    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe();

    expect(mockLogger.log).not.toHaveBeenCalled();
  });

  it('should log an error if logging fails', () => {
    const mockExecutionContext = {
      getType: jest.fn().mockReturnValue('graphql'),
    } as unknown as ExecutionContext;

    jest.spyOn(GqlExecutionContext, 'create').mockImplementation(() => {
      throw new Error('Test error');
    });

    const mockCallHandler: CallHandler = {
      handle: jest.fn().mockReturnValue(of('test')),
    };

    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe();

    expect(mockLogger.error).toHaveBeenCalledWith('LoggingInterceptor failed:', expect.any(Error));
  });
});
