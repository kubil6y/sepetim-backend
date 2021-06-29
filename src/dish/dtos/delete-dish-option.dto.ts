import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';

@InputType()
export class DeleteDishOptionInput {
  @Field(() => Int)
  dishOptionId: number;
}

@ObjectType()
export class DeleteDishOptionOutput extends CoreOutput {}
