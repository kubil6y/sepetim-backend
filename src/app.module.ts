import Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { TOKEN_KEY, __dev__, __prod__ } from './common/constants';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from './jwt/jwt.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { SendGridModule } from '@anchan828/nest-sendgrid';

@Module({
  imports: [
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
        JWT_SECRET_KEY: Joi.string().required(),
        SENDGRID_API_KEY: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot({
      playground: __dev__,
      context: ({ req }) => ({
        token: req.headers[TOKEN_KEY],
      }),
      autoSchemaFile: true,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            error?.extensions?.exception?.response?.message || error?.message,
        };
        return graphQLFormattedError;
      },
    }),
    DatabaseModule,
    CommonModule,
    AuthModule,
    UserModule,
    JwtModule,
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
