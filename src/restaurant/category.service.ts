import { CreateCategoryInput, CreateCategoryOutput } from './dtos';
import { Injectable } from '@nestjs/common';
import { f } from 'src/common/errors';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(
    createCategoryInput: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    try {
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
}
