import { Injectable } from '@nestjs/common';
import { f, notFound } from 'src/common/errors';
import { UserOutput } from './dtos';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserById(id: number): Promise<UserOutput> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) return notFound('user');

      return { ok: true, user };
    } catch (error) {
      return f('Could not find user');
    }
  }
}
