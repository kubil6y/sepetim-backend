import {
  CreateDishOptionInput,
  CreateDishOptionOutput,
  DeleteDishOptionInput,
  DeleteDishOptionOutput,
  EditDishOptionInput,
  EditDishOptionOutput,
  GetDishOptionInput,
  GetDishOptionOutput,
} from './dtos';
import { f, notFound } from 'src/common/errors';
import { Injectable } from '@nestjs/common';
import { DishOptionRepository } from './repositories/dish-option.repository';
import { DishRepository } from './repositories/dish.repository';

@Injectable()
export class DishOptionService {
  constructor(
    private readonly dishRepository: DishRepository,
    private readonly dishOptionRepository: DishOptionRepository,
  ) {}

  async getDishOption({
    dishOptionId,
  }: GetDishOptionInput): Promise<GetDishOptionOutput> {
    try {
      const dishOption = await this.dishOptionRepository.findOne(dishOptionId);
      if (!dishOption) return notFound('dish option');

      return { ok: true, dishOption };
    } catch (error) {
      return f('Could not load dish option');
    }
  }

  async createDishOption({
    dishId,
    ...restInput
  }: CreateDishOptionInput): Promise<CreateDishOptionOutput> {
    try {
      const dish = await this.dishRepository.findOne(dishId);
      if (!dish) return notFound('dish');

      await this.dishOptionRepository.save(
        this.dishOptionRepository.create({
          ...restInput,
          dish,
        }),
      );

      return { ok: true };
    } catch (error) {
      return f('Could not create dish option');
    }
  }

  async editDishOption({
    dishOptionId,
    ...restInput
  }: EditDishOptionInput): Promise<EditDishOptionOutput> {
    try {
      const dishOption = await this.dishOptionRepository.findOne(dishOptionId);
      if (!dishOption) return notFound('dish option');

      await this.dishOptionRepository.save({
        id: dishOption.id,
        ...restInput,
      });

      return { ok: true };
    } catch (error) {
      return f('Could not edit dish option');
    }
  }

  async deleteDishOption({
    dishOptionId,
  }: DeleteDishOptionInput): Promise<DeleteDishOptionOutput> {
    try {
      const dishOption = await this.dishOptionRepository.findOne(dishOptionId);
      if (!dishOption) return notFound('dish option');

      await this.dishOptionRepository.remove(dishOption);
      return { ok: true };
    } catch (error) {
      return f('Could not delete dish option');
    }
  }
}
