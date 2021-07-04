import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class GetRestaurantInput {
  @Field(() => String)
  slug: number;
}

@ObjectType()
export class GetRestaurantOutput extends CoreOutput {
  @Field(() => Restaurant, { nullable: true })
  restaurant?: Restaurant;
}
