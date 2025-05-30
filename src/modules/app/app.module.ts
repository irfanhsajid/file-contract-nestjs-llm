import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { MongooseModule } from '@nestjs/mongoose';

import { mongooseFactory } from 'src/utils/mongooseFactory';
import { PatientsResolver } from '../../patients/patients.resolver';
import { PatientsService } from '../../patients/patients.service';
import { FileContractModule } from '../file-contracts/file-contract.module';
import { HealthController } from './health.controller';
import { ClinvaultModule } from '../clinvault/clinvault.module';

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
    MongooseModule.forRootAsync({
      useFactory: mongooseFactory,
    }),
    FileContractModule,
    ClinvaultModule,
  ],
  controllers: [HealthController],
  providers: [PatientsResolver, PatientsService],
})
export class AppModule {}
