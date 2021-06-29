import {
  Field,
  InputType,
  Int,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { CreateDishOptionInput } from './create-dish-option.dto';

@InputType()
export class EditDishOptionInput extends PartialType(
  OmitType(CreateDishOptionInput, ['dishId'] as const),
) {
  @Field(() => Int)
  dishOptionId: number;
}

@ObjectType()
export class EditDishOptionOutput extends CoreOutput {}
