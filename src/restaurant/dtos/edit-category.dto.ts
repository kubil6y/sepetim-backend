import {
  InputType,
  PartialType,
  Field,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { CreateCategoryInput } from '.';

@InputType()
export class EditCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => Int)
  categoryId: number;
}

@ObjectType()
export class EditCategoryOutput extends CoreOutput {}
