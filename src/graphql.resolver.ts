import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class GraphQlResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Bismillah! Hello! From Graphql!';
  }
}
