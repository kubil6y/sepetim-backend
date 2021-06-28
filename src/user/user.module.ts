import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { VerificationRepository } from './repositories/verification.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { VerificationResolver } from './verification.resolver';
import { VerificationService } from './verification.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, VerificationRepository])],
  providers: [
    UserResolver,
    UserService,
    VerificationResolver,
    VerificationService,
  ],
  exports: [UserService],
})
export class UserModule {}
