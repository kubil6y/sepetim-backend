import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { DishOption } from '../entities/dish-option.entity';

@InputType()
export class GetDishOptionInput {
  @Field(() => Int)
  dishOptionId: number;
}

@ObjectType()
export class GetDishOptionOutput extends CoreOutput {
  @Field(() => DishOption, { nullable: true })
  dishOption?: DishOption;
}
