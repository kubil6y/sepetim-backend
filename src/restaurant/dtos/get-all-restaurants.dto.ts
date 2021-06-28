import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaginationInput, PaginationOutput } from 'src/common/dtos';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class GetAllRestaurantsInput extends PaginationInput {}

@ObjectType()
export class GetAllRestaurantsOutput extends PaginationOutput {
  @Field(() => [Restaurant], { nullable: true })
  results?: Restaurant[];
}
