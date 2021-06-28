import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from 'src/jwt/jwt.service';
import { UserService } from 'src/user/user.service';
import { AllowedRoles, METADATAKEY_ROLES } from './role.decorator';

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

      if (!roles || roles.length === 0) return false;
      if (roles.includes('Public')) return true;

      const gqlContext = GqlExecutionContext.create(context).getContext();
      const token = gqlContext.token;

      if (token) {
        const decoded = this.jwtService.verify(token);
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const { ok, user } = await this.userService.findUserById(
            decoded['id'],
          );
          if (ok && user) {
            if (roles.includes('All')) return true;
            return roles.includes(user.role);
          }
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}
