import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaginationOutput } from 'src/common/dtos';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class RestaurantsByCategoryInput {
  @Field(() => String)
  categoryName: string;
}

@ObjectType()
export class RestaurantsByCategoryOutput extends PaginationOutput {
  @Field(() => [Restaurant], { nullable: true })
  results?: Restaurant[];
}
