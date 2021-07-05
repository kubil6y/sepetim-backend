import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { Restaurant } from '../entities/restaurant.entity';

@ObjectType()
export class GetFiveOutput extends CoreOutput {
  @Field(() => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];
}
