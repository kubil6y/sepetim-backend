import {
  CreateUserInput,
  CreateUserOutput,
  UserOutput,
  LoginOutput,
  LoginInput,
  GetAllUsersInput,
  GetAllUsersOutput,
  EditUserProfileOutput,
  EditUserProfileInput,
} from './dtos';
import { Injectable } from '@nestjs/common';
import { f, notFound } from 'src/common/errors';
import { UserRepository } from './repositories/user.repository';
import { JwtService } from 'src/jwt/jwt.service';
import { VerificationRepository } from './repositories/verification.repository';
import { SendGridService } from '@anchan828/nest-sendgrid';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly verificationRepository: VerificationRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: SendGridService,
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

      const verification = await this.verificationRepository.save(
        this.verificationRepository.create({ user }),
      );

      await this.mailService.send({
        to: user.email,
        from: 'lieqb2@gmail.com',
        subject: '[Sepetim] Account Activation Code',
        text: `Activation code: ${verification.code}`,
      });

      return { ok: true, user };
    } catch (error) {
      return f('Could not create user');
    }
  }

  async loginUser(loginInput: LoginInput): Promise<LoginOutput> {
    try {
      const { ok, error, user } =
        await this.userRepository.findUserByCredentials(loginInput);

      if (error) return f(error);

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

  async getAllUsers({ page }: GetAllUsersInput): Promise<GetAllUsersOutput> {
    try {
      const { meta, results } = await this.userRepository.paginate({
        ...(page && { page }),
        take: 20,
      });

      return { ok: true, meta, results };
    } catch (error) {
      return f('Could not load users');
    }
  }

  async editUserProfile(
    userId: number,
    { email, password, address, firstName, lastName }: EditUserProfileInput,
  ): Promise<EditUserProfileOutput> {
    try {
      const user = await this.userRepository.findOne(userId);
      if (!user) return notFound('user');

      if (email) {
        user.verified = false;
        user.email = email;
        await this.verificationRepository.delete({ user: { id: user.id } });
        await this.verificationRepository.save(
          this.verificationRepository.create({ user }),
        );
      }
      if (password) user.password = password;
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (address) user.address = address;

      await this.userRepository.save(user);
      return { ok: true };
    } catch (error) {
      return f('Could not update profile');
    }
  }
}
