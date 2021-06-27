import Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { __dev__, __prod__ } from './common/constants';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: __dev__,
      autoSchemaFile: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: __dev__ ? '.env.dev' : '.env.test',
      ignoreEnvFile: __prod__,
      validationSchema: Joi.object({
        NODE_ENV: Joi.valid('production', 'development', 'test'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [],
      synchronize: __dev__,
    }),
    CommonModule,
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
