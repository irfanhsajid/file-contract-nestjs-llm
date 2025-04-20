import { Resolver, Query, Args } from '@nestjs/graphql';
import { FileContractService } from './file-contract.service';
import { User } from 'src/graphql.schema';

@Resolver('User')
export class FileContractResolver {
  constructor(private readonly fileContractService: FileContractService) {}

  @Query(() => User)
  getUser(@Args('id') id: string): User {
    return this.fileContractService.getUser(id);
  }
}
