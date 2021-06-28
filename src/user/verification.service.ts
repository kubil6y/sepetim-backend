import { Injectable } from '@nestjs/common';
import { f } from 'src/common/errors';
import { VerifyEmailInput, VerifyEmailOutput } from './dtos';
import { UserRepository } from './repositories/user.repository';
import { VerificationRepository } from './repositories/verification.repository';

@Injectable()
export class VerificationService {
  constructor(
    private readonly verificationRepository: VerificationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async verifyEmail({ code }: VerifyEmailInput): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verificationRepository.findOne(
        { code },
        { relations: ['user'] },
      );

      if (!verification) return f('Invalid Code');

      // updating user verification status && update promise
      verification.user.verified = true;
      const p1 = this.userRepository.save(verification.user);
      // removing verification promise
      const p2 = this.verificationRepository.remove(verification);
      // resolving promises at the same time, all or nothing
      await Promise.all([p1, p2]);

      return { ok: true };
    } catch (error) {
      return f('Could not verify email');
    }
  }
}
