import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class GraphQlResolver {
  @Query(() => String)
  hello(): string {
    return 'Bismillah! Hello! From Graphql!';
  }
}
