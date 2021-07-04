import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaginationInput, PaginationOutput } from 'src/common/dtos';
import { Category } from '../entities/category.entity';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class RestaurantsByCategoryInput extends PaginationInput {
  @Field(() => String)
  slug: string;
}

@ObjectType()
export class RestaurantsByCategoryOutput extends PaginationOutput {
  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => [Restaurant], { nullable: true })
  results?: Restaurant[];
}
