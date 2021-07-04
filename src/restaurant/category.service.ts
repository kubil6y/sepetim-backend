import {
  CreateCategoryInput,
  CreateCategoryOutput,
  DeleteCategoryInput,
  DeleteCategoryOutput,
  EditCategoryInput,
  EditCategoryOutput,
  GetAllCategoriesOutput,
  GetCategoryInput,
  GetCategoryOutput,
  RestaurantsByCategoryInput,
  RestaurantsByCategoryOutput,
} from './dtos';
import { Injectable } from '@nestjs/common';
import { f, notFound } from 'src/common/errors';
import { CategoryRepository } from './repositories/category.repository';
import { RestaurantRepository } from './repositories/restaurant.repository';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async createCategory(
    createCategoryInput: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    try {
      const category = await this.categoryRepository.findOne({
        name: createCategoryInput.name.toLowerCase(),
      });
      if (category) return f('Category already exists');

      await this.categoryRepository.save(
        this.categoryRepository.create({
          ...createCategoryInput,
          name: createCategoryInput.name.toLowerCase(),
        }),
      );

      return { ok: true };
    } catch (error) {
      return f('Could not create category');
    }
  }

  async editCategory({
    categoryId,
    name,
    ...restInput
  }: EditCategoryInput): Promise<EditCategoryOutput> {
    try {
      const category = await this.categoryRepository.findOne(categoryId);
      if (!category) return notFound('category');

      await this.categoryRepository.save({
        id: category.id,
        name: name.toLowerCase(),
        ...restInput,
      });

      return { ok: true };
    } catch (error) {
      return f('Could not edit category');
    }
  }

  async deleteCategory({
    categoryId,
  }: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
    try {
      const category = await this.categoryRepository.findOne(categoryId);
      if (!category) return notFound('category');

      await this.categoryRepository.remove(category);
      return { ok: true };
    } catch (error) {
      return f('Could not delete category');
    }
  }

  async restaurantsByCategory({
    slug,
    page,
  }: RestaurantsByCategoryInput): Promise<RestaurantsByCategoryOutput> {
    try {
      const category = await this.categoryRepository.findOne({ slug });
      if (!category) return notFound('category');

      const { meta, results } = await this.restaurantRepository.paginate({
        where: { category },
        take: 5,
        ...(page && { page }),
      });

      return { ok: true, meta, results, category };
    } catch (error) {
      return f('Could not load restaurants');
    }
  }

  async getCategory({ slug }: GetCategoryInput): Promise<GetCategoryOutput> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { slug },
      });
      if (!category) return notFound('category');

      return { ok: true, category };
    } catch (error) {
      return f('Could not load category');
    }
  }

  async getAllCategories(): Promise<GetAllCategoriesOutput> {
    try {
      const categories = await this.categoryRepository.find();

      return { ok: true, categories };
    } catch (error) {
      return f('Could not load categories');
    }
  }
}
