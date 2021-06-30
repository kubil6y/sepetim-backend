import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
  EditRestaurantInput,
  EditRestaurantOutput,
  GetAllRestaurantsInput,
  GetAllRestaurantsOutput,
  GetRestaurantInput,
  GetRestaurantOutput,
  RatingsOutput,
  SearchRestaurantInput,
  SearchRestaurantOutput,
} from './dtos';
import { f, notFound } from 'src/common/errors';
import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { CategoryRepository } from './repositories/category.repository';
import { Category } from './entities/category.entity';
import { ILike } from 'typeorm';
import { RatingRepository } from 'src/rating/repositories/rating.repository';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class ResturantService {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly ratingRepository: RatingRepository,
  ) {}

  async searchRestaurant({
    query,
  }: SearchRestaurantInput): Promise<SearchRestaurantOutput> {
    try {
      const restaurants = await this.restaurantRepository.find({
        where: {
          name: ILike(`${query}%`),
        },
        relations: ['category'],
      });

      return { ok: true, restaurants };
    } catch (error) {
      return f('Could not load restaurant');
    }
  }

  async getAllRestaurants({
    page,
  }: GetAllRestaurantsInput): Promise<GetAllRestaurantsOutput> {
    try {
      const { meta, results } = await this.restaurantRepository.paginate({
        ...(page && { page }),
        take: 10,
        relations: ['category'],
      });

      return { ok: true, meta, results };
    } catch (error) {
      return f('Could not load restaurants');
    }
  }

  async getRestaurant({
    restaurantId,
  }: GetRestaurantInput): Promise<GetRestaurantOutput> {
    try {
      // TODO menu.options delete this afterwards, we will get menu, then use will click on dish to get its details.
      const restaurant = await this.restaurantRepository.findOne(restaurantId, {
        relations: ['category', 'menu', 'menu.options'],
      });
      if (!restaurant) return notFound('restaurant');

      return { ok: true, restaurant };
    } catch (error) {
      return f('Could not load restaurant');
    }
  }

  async createRestaurant({
    categoryName,
    ...restInput
  }: CreateRestaurantInput): Promise<CreateRestaurantOutput> {
    try {
      const category = await this.categoryRepository.findOne({
        name: categoryName.toLowerCase(),
      });
      if (!category) return notFound('category');

      await this.restaurantRepository.save(
        this.restaurantRepository.create({ ...restInput, category }),
      );

      return { ok: true };
    } catch (error) {
      return f('Could not create restaurant');
    }
  }

  async editRestaurant({
    restaurantId,
    categoryName,
    ...restInput
  }: EditRestaurantInput): Promise<EditRestaurantOutput> {
    try {
      const restaurant = await this.restaurantRepository.findOne(restaurantId);
      if (!restaurant) return notFound('restaurant');

      let category: Category = null;
      if (categoryName) {
        category = await this.categoryRepository.findOne({
          name: categoryName.toLowerCase(),
        });
        if (!category) return notFound('category');
      }

      await this.restaurantRepository.save({
        id: restaurant.id,
        ...restInput,
        ...(category && { category }),
      });

      return { ok: true };
    } catch (error) {
      return f('Could not edit restaurant');
    }
  }

  async deleteRestaurant({
    restaurantId,
  }: DeleteRestaurantInput): Promise<DeleteRestaurantOutput> {
    try {
      const restaurant = await this.restaurantRepository.findOne(restaurantId);
      if (!restaurant) return notFound('restaurant');
      await this.restaurantRepository.remove(restaurant);

      return { ok: true };
    } catch (error) {
      return f('Could not delete restaurant');
    }
  }

  async restaurantRating(restaurant: Restaurant): Promise<RatingsOutput> {
    const ratings = await this.ratingRepository.find({
      where: { restaurant: restaurant.id },
    });

    const len = ratings.length;
    const result: RatingsOutput = {
      speed: ratings.reduce((acc, curr) => acc + curr.speed, 0) / len,
      taste: ratings.reduce((acc, curr) => acc + curr.taste, 0) / len,
      service: ratings.reduce((acc, curr) => acc + curr.service, 0) / len,
    };

    return { ...result };
  }
}
