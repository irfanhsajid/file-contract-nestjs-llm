import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQlResolver } from './graphql.resolver';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/nestjs-graphql'), // Update with your MongoDB URI
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Generates schema.gql file
      sortSchema: true,
      playground: false, // Disable the default GraphQL Playground
      plugins: [
        ApolloServerPluginLandingPageLocalDefault(), // Use Apollo Sandbox as the default playground
      ],
    }),
  ],
  controllers: [AppController],
  providers: [GraphQlResolver, AppService],
})
export class AppModule {}
