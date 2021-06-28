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
  RestaurantsByCategoryInput,
  RestaurantsByCategoryOutput,
  SearchRestaurantInput,
  SearchRestaurantOutput,
} from './dtos';
import { f, notFound } from 'src/common/errors';
import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { CategoryRepository } from './repositories/category.repository';
import { Category } from './entities/category.entity';
import { ILike } from 'typeorm';

@Injectable()
export class ResturantService {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async searchRestaurant({
    query,
  }: SearchRestaurantInput): Promise<SearchRestaurantOutput> {
    try {
      const restaurants = await this.restaurantRepository.find({
        where: {
          name: ILike(`${query}%`),
        },
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
        where: {
          ...(page && { page }),
        },
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
      const restaurant = await this.restaurantRepository.findOne(restaurantId, {
        relations: ['category'],
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

  async restaurantsByCategory({
    categoryName,
  }: RestaurantsByCategoryInput): Promise<RestaurantsByCategoryOutput> {
    try {
      const category = await this.categoryRepository.findOne({
        name: categoryName.toLowerCase(),
      });
      if (!category) return notFound('category');

      const { meta, results } = await this.restaurantRepository.paginate({
        where: { category },
        take: 10,
      });

      return { ok: true, meta, results };
    } catch (error) {
      return f('Could not load restaurants');
    }
  }
}
