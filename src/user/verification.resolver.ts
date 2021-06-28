import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Role } from 'src/auth/role.decorator';
import { VerifyEmailInput, VerifyEmailOutput } from './dtos';
import { Verification } from './entities/verification.entity';
import { VerificationService } from './verification.service';

@Resolver(() => Verification)
export class VerificationResolver {
  constructor(private readonly verificationService: VerificationService) {}

  @Role('Public')
  @Mutation(() => VerifyEmailOutput)
  verifyEmail(
    @Args('input') verifyEmailInput: VerifyEmailInput,
  ): Promise<VerifyEmailOutput> {
    return this.verificationService.verifyEmail(verifyEmailInput);
  }
}
