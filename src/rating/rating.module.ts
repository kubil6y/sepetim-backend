import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from 'src/order/repositories/order.repository';
import { RatingRepository } from 'src/rating/repositories/rating.repository';
import { RestaurantRepository } from 'src/restaurant/repositories/restaurant.repository';
import { RatingResolver } from './rating.resolver';
import { RatingService } from './rating.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RatingRepository,
      RestaurantRepository,
      OrderRepository,
    ]),
  ],
  providers: [RatingResolver, RatingService],
})
export class RatingModule {}
