import {
  Field,
  Float,
  InputType,
  Int,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import { Min } from 'class-validator';
import { CoreOutput } from 'src/common/core.output';
import { Dish } from '../entities/dish.entity';

@InputType()
export class CreateDishWithOptionsInput {
  @Field(() => String)
  name: string;

  @Field(() => Float)
  @Min(0)
  extra: number;

  @Field(() => Int)
  calorie: number;
}

@InputType()
export class CreateDishInput extends PickType(Dish, [
  'name',
  'basePrice',
  'image',
  'calorie',
]) {
  @Field(() => Int)
  restaurantId: number;

  @Field(() => [CreateDishWithOptionsInput], { nullable: true })
  options?: CreateDishWithOptionsInput[];
}

@ObjectType()
export class CreateDishOutput extends CoreOutput {}
