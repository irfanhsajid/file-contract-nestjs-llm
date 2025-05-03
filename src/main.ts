import dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import { Logger } from '@nestjs/common';

import { AppModule } from './modules/app/app.module';
import config from './config';
import { GraphQLLoggingInterceptor } from './interceptors/logging.interceptor';
import { getCorsConfig } from './utils/getCorsConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');

  app.enableCors(getCorsConfig());

  app.useGlobalInterceptors(new GraphQLLoggingInterceptor());

  app.use(
    graphqlUploadExpress({
      maxFileSize: config.graphqlUploadExpress.maxFileSize,
      maxFiles: config.graphqlUploadExpress.maxFiles,
    }),
  );

  const PORT: number = config.port;
  await app.listen(PORT, () => {
    logger.log(`Server is running on http://localhost:${PORT}`);
    logger.log(`GraphQL Playground is available at http://localhost:${PORT}/graphql`);
  });
}

bootstrap();
