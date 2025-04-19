import { Resolver, Query, Args } from '@nestjs/graphql';
import { FileContractService } from './file-contract.service';

import { UserType } from './dto/user-type';

@Resolver('User')
export class FileContractResolver {
  constructor(private readonly fileContractService: FileContractService) {}

  @Query(() => UserType)
  getUser(@Args('id') id: string): UserType {
    return this.fileContractService.getUser(id);
  }
}
