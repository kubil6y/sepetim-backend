import { CoreRepository } from 'src/common/core.repository';
import { EntityRepository } from 'typeorm';
import { DishOption } from '../entities/dish-option.entity';

@EntityRepository(DishOption)
export class DishOptionRepository extends CoreRepository<DishOption> {}
