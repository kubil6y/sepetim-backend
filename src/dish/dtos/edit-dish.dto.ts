import {
  Field,
  InputType,
  Int,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { CreateDishInput } from './create-dish.dto';

@InputType()
export class EditDishInput extends PartialType(
  OmitType(CreateDishInput, ['restaurantId'] as const),
) {
  @Field(() => Int)
  dishId: number;
}

@ObjectType()
export class EditDishOutput extends CoreOutput {}
