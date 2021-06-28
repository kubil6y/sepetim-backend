import { CoreRepository } from 'src/common/core.repository';
import { EntityRepository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';

@EntityRepository(Restaurant)
export class RestaurantRepository extends CoreRepository<Restaurant> {}
