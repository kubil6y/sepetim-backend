import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';

@InputType()
export class DeleteDishInput {
  @Field(() => Int)
  dishId: number;
}

@ObjectType()
export class DeleteDishOutput extends CoreOutput {}
