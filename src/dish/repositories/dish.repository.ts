import { CoreRepository } from 'src/common/core.repository';
import { EntityRepository } from 'typeorm';
import { Dish } from '../entities/dish.entity';

@EntityRepository(Dish)
export class DishRepository extends CoreRepository<Dish> {}
