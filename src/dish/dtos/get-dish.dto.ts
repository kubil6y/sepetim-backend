import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { Dish } from '../entities/dish.entity';

@InputType()
export class GetDishInput {
  @Field(() => Int)
  dishId: number;
}

@ObjectType()
export class GetDishOutput extends CoreOutput {
  @Field(() => Dish, { nullable: true })
  dish?: Dish;
}
