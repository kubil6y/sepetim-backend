import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaginationOutput } from 'src/common/dtos';
import { Category } from '../entities/category.entity';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class RestaurantsByCategoryInput {
  @Field(() => String)
  categoryName: string;
}

@ObjectType()
export class RestaurantsByCategoryOutput extends PaginationOutput {
  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => [Restaurant], { nullable: true })
  results?: Restaurant[];
}
