import jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/auth/types';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.configService.get('JWT_SECRET_KEY'));
  }

  verify(token: string): string | object {
    return jwt.verify(token, this.configService.get('JWT_SECRET_KEY'));
  }
}
