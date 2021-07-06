import Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { TOKEN_KEY, __dev__, __prod__ } from './common/constants';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from './jwt/jwt.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';
import { DishModule } from './dish/dish.module';
import { RatingModule } from './rating/rating.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishOption } from './dish/entities/dish-option.entity';
import { Dish } from './dish/entities/dish.entity';
import { OrderItem } from './order/entities/order-item.entity';
import { Order } from './order/entities/order.entity';
import { Rating } from './rating/entities/rating.entity';
import { Category } from './restaurant/entities/category.entity';
import { Restaurant } from './restaurant/entities/restaurant.entity';
import { User } from './user/entities/user.entity';
import { Verification } from './user/entities/verification.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: __dev__ ? '.env.dev' : '.env.test',
      ignoreEnvFile: __prod__,
      validationSchema: Joi.object({
        NODE_ENV: Joi.valid('production', 'development', 'test').required(),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.string(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_DATABASE: Joi.string(),
        JWT_SECRET_KEY: Joi.string().required(),
        SENDGRID_API_KEY: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot({
      introspection: true,
      playground: true,
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.DATABASE_URL
        ? {
            url: process.env.DATABASE_URL,
          }
        : {
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
          }),
      entities: [
        User,
        Verification,
        Restaurant,
        Category,
        Rating,
        Order,
        OrderItem,
        Dish,
        DishOption,
      ],
      synchronize: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    CommonModule,
    AuthModule,
    UserModule,
    RestaurantModule,
    DishModule,
    OrderModule,
    JwtModule,
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
    RatingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
