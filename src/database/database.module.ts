import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { __dev__ } from 'src/common/constants';
import { Address } from 'src/user/entities/address.entity';
import { User } from 'src/user/entities/user.entity';
import { Verification } from 'src/user/entities/verification.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [User, Address, Verification],
          synchronize: __dev__,
          //logging: __dev__,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
