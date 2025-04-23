import { mongooseFactory } from '../mongooseFactory';
import config from 'src/config';

jest.mock('src/config', () => ({
  mongo: {
    host: 'localhost',
    port: '27017',
    db: 'testdb',
  },
}));

describe('mongooseFactory', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct MongooseModuleFactoryOptions', () => {
    const result = mongooseFactory();
    expect(result).toEqual({
      uri: 'mongodb://localhost:27017/testdb',
    });
  });

  it('should throw an error if the database host is not defined', () => {
    const originalHost = config.mongo.host;
    config.mongo.host = undefined;

    expect(() => mongooseFactory()).toThrow('Database URI is not defined in the configuration.');

    // Restore the original host value
    config.mongo.host = originalHost;
  });

  it('should throw an error if the database port is not defined', () => {
    const originalPort = config.mongo.port;
    config.mongo.port = undefined;

    expect(() => mongooseFactory()).toThrow('Database URI is not defined in the configuration.');

    // Restore the original port value
    config.mongo.port = originalPort;
  });
});
