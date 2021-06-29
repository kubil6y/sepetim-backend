import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantRepository } from 'src/restaurant/repositories/restaurant.repository';
import { DishOptionResolver } from './dish-option.resolver';
import { DishOptionService } from './dish-option.service';
import { DishResolver } from './dish.resolver';
import { DishService } from './dish.service';
import { DishOptionRepository } from './repositories/dish-option.repository';
import { DishRepository } from './repositories/dish.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DishRepository,
      DishOptionRepository,
      RestaurantRepository,
    ]),
  ],
  providers: [DishResolver, DishService, DishOptionResolver, DishOptionService],
  exports: [DishService],
})
export class DishModule {}
