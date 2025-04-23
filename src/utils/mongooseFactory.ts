import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import config from 'src/config';

export const mongooseFactory = ():
  | Promise<MongooseModuleFactoryOptions>
  | MongooseModuleFactoryOptions => {
  const mongoConfig = config.mongo;

  if (!mongoConfig.host || !mongoConfig.port) {
    throw new Error('Database URI is not defined in the configuration.');
  }

  return {
    uri: `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.db}`,
  };
};
