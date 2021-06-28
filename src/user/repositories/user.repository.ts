import { isEmail } from 'class-validator';
import { CoreRepository } from 'src/common/core.repository';
import { f, notFound } from 'src/common/errors';
import { EntityRepository } from 'typeorm';
import { LoginInput, UserOutput } from '../dtos';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends CoreRepository<User> {
  async findUserByCredentials({
    credentials,
    password,
  }: LoginInput): Promise<UserOutput> {
    try {
      let user: User = null;
      if (isEmail(credentials)) {
        user = await this.findOne(
          { email: credentials },
          { select: ['id', 'password'] },
        );
      } else {
        user = await this.findOne(
          { username: credentials },
          { select: ['id', 'password'] },
        );
      }
      if (!user) return notFound('user');

      const isPwValid = await user.validatePassword(password);
      if (!isPwValid) return f('Invalid Credentials');

      return { ok: true, user };
    } catch (error) {
      return f('Could not find user');
    }
  }
}
