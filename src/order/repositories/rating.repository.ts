import { CoreRepository } from 'src/common/core.repository';
import { EntityRepository } from 'typeorm';
import { Rating } from '../entities/rating.entity';

@EntityRepository(Rating)
export class RatingRepository extends CoreRepository<Rating> {}
