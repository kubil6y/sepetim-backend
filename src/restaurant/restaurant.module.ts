import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingRepository } from 'src/rating/repositories/rating.repository';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { CategoryRepository } from './repositories/category.repository';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { ResturantResolver } from './restaurant.resolver';
import { ResturantService } from './restaurant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RestaurantRepository,
      CategoryRepository,
      RatingRepository,
    ]),
  ],
  providers: [
    ResturantResolver,
    ResturantService,
    CategoryResolver,
    CategoryService,
  ],
  exports: [ResturantService, CategoryService],
})
export class RestaurantModule {}
