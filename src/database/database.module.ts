import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { __dev__ } from 'src/common/constants';
import { DishOption } from 'src/dish/entities/dish-option.entity';
import { Dish } from 'src/dish/entities/dish.entity';
import { OrderItem } from 'src/order/entities/order-item.entity';
import { Order } from 'src/order/entities/order.entity';
import { Rating } from 'src/order/entities/rating.entity';
import { Category } from 'src/restaurant/entities/category.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
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
          synchronize: __dev__,
          //logging: __dev__,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
