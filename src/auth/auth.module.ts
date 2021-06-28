import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_GUARD, // makes it global
      useClass: AuthGuard,
    },
  ],
  exports: [],
})
export class AuthModule {}
