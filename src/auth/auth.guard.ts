import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from 'src/jwt/jwt.service';
import { UserService } from 'src/user/user.service';
import { AllowedRoles, METADATAKEY_ROLES } from './role.decorator';

/*
// Auth + Role flow
1. there are no middlewares.
2. For every request context function (in app.module) runs. 
3. Whatever context function returns gets added to context.
4. AuthGuard is global, so after context the guard runs.
5. This guard combines, roles and auth in one.
*/

// This is a global guard. thanks to  APP_GUARD in auth.module.ts
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const roles = this.reflector.get<AllowedRoles>(
        METADATAKEY_ROLES,
        context.getHandler(),
      );

      if (!roles || roles.length === 0) return false; // all endpoints must have @Role() decorator
      if (roles.includes('Public')) return true; // public endpoints

      const gqlContext = GqlExecutionContext.create(context).getContext();
      const token = gqlContext.token;

      if (token) {
        const decoded = this.jwtService.verify(token);
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const { ok, user } = await this.userService.findUserById(
            decoded['id'],
          );
          if (ok && user) {
            if (roles.includes('All')) return true; // any logged in user
            return roles.includes(user.role); // only certain users
          }
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}
