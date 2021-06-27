import {
  CreateUserInput,
  CreateUserOutput,
  UserOutput,
  LoginOutput,
  LoginInput,
} from './dtos';
import { Injectable } from '@nestjs/common';
import { f, notFound } from 'src/common/errors';
import { UserRepository } from './repositories/user.repository';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async findUserById(id: number): Promise<UserOutput> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) return notFound('user');

      return { ok: true, user };
    } catch (error) {
      return f('Could not find user');
    }
  }

  async createUser(
    createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    try {
      const exists = await this.userRepository.findOne({
        email: createUserInput.email,
      });
      if (exists) return f('User already exists');

      const user = await this.userRepository.save(
        this.userRepository.create(createUserInput),
      );
      return { ok: true, user };
    } catch (error) {
      return f('Could not create user');
    }
  }

  async loginUser(loginInput: LoginInput): Promise<LoginOutput> {
    try {
      const { ok, error, user } =
        await this.userRepository.findUserByCredentials(loginInput);

      if (error) {
        return f(error);
      }

      if (ok) {
        const token = this.jwtService.sign({
          id: user.id,
        });
        return { ok: true, token };
      }
    } catch (error) {
      return f('Could not login user');
    }
  }
}
