import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { Rating } from '../entities/rating.entity';

@ObjectType()
export class Top5RestaurantsOutput extends CoreOutput {
  @Field(() => [Rating], { nullable: true })
  ratings?: Rating[];
}
