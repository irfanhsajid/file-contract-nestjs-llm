import { Injectable } from '@nestjs/common';

export interface TUser {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class FileContractService {
  getUser(id: string): TUser {
    // Hardcoded for simplicity; replace with Mongoose later if needed
    return {
      id,
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
  }
}
