import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { DishOption } from '../entities/dish-option.entity';

@InputType()
export class CreateDishOptionInput extends PickType(DishOption, [
  'name',
  'extra',
]) {
  @Field(() => Int)
  dishId: number;
}

@ObjectType()
export class CreateDishOptionOutput extends CoreOutput {}
