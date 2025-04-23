import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import { mongooseFactory } from 'src/utils/mongooseFactory';
import { PatientsResolver } from '../../patients/patients.resolver';
import { PatientsService } from '../../patients/patients.service';
import { FileContractModule } from '../file-contracts/file-contract.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
      playground: false,
      introspection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    // MongooseModule.forRootAsync({
    //   useFactory: mongooseFactory,
    // }),
    MongooseModule.forRoot('mongodb://localhost:27017/natera-clinverify'),
    FileContractModule,
  ],
  controllers: [HealthController],
  providers: [PatientsResolver, PatientsService],
})
export class AppModule {}
