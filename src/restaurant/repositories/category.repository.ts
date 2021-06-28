import { CoreRepository } from 'src/common/core.repository';
import { EntityRepository } from 'typeorm';
import { Category } from '../entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends CoreRepository<Category> {}
