import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishOptionRepository } from 'src/dish/repositories/dish-option.repository';
import { DishRepository } from 'src/dish/repositories/dish.repository';
import { RestaurantRepository } from 'src/restaurant/repositories/restaurant.repository';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { OrderItemRepository } from './repositories/order-item.repository';
import { OrderRepository } from './repositories/order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository,
      OrderItemRepository,
      DishRepository,
      DishOptionRepository,
      RestaurantRepository,
    ]),
  ],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
