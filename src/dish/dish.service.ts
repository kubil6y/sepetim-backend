import {
  CreateDishInput,
  CreateDishOutput,
  DeleteDishInput,
  DeleteDishOutput,
  EditDishInput,
  EditDishOutput,
  GetDishInput,
  GetDishOutput,
} from './dtos';
import { Injectable } from '@nestjs/common';
import { f, notFound } from 'src/common/errors';
import { RestaurantRepository } from 'src/restaurant/repositories/restaurant.repository';
import { DishRepository } from './repositories/dish.repository';
import { DishOptionRepository } from './repositories/dish-option.repository';
import { DishOption } from './entities/dish-option.entity';

@Injectable()
export class DishService {
  constructor(
    private readonly dishRepository: DishRepository,
    private readonly dishOptionRepository: DishOptionRepository,
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async createDish({
    restaurantId,
    options,
    ...restInput
  }: CreateDishInput): Promise<CreateDishOutput> {
    try {
      const restaurant = await this.restaurantRepository.findOne(restaurantId);
      if (!restaurant) return notFound('restaurant');

      const dish = await this.dishRepository.save(
        this.dishRepository.create({ ...restInput, restaurant }),
      );

      if (options) {
        const dishOptions: DishOption[] = [];

        options.forEach(async (option) => {
          const dishOption = await this.dishOptionRepository.save(
            this.dishOptionRepository.create({
              ...option,
              dish,
            }),
          );

          dishOptions.push(dishOption);
        });

        dish.options = dishOptions;
        await this.dishRepository.save(dish);
      }

      console.log(dish);
      return { ok: true };
    } catch (error) {
      return f('Could not create dish');
    }
  }

  async editDish({
    dishId,
    ...restInput
  }: EditDishInput): Promise<EditDishOutput> {
    try {
      const dish = await this.dishRepository.findOne(dishId);
      if (!dish) return notFound('dish');

      await this.dishRepository.save({
        id: dish.id,
        ...restInput,
      });

      return { ok: true };
    } catch (error) {
      return f('Could not edit dish');
    }
  }

  async deleteDish({ dishId }: DeleteDishInput): Promise<DeleteDishOutput> {
    try {
      const dish = await this.dishRepository.findOne(dishId);
      if (!dish) return notFound('dish');

      await this.dishRepository.remove(dish);
      return { ok: true };
    } catch (error) {
      return f('Could not delete dish');
    }
  }

  async getDish({ dishId }: GetDishInput): Promise<GetDishOutput> {
    try {
      const dish = await this.dishRepository.findOne(dishId, {
        relations: ['options'],
      });
      if (!dish) return notFound('dish');
      return { ok: true, dish };
    } catch (error) {
      return f('Could not load dish');
    }
  }
}
