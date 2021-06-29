import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';

@InputType()
export class DeleteCategoryInput {
  @Field(() => Int)
  categoryId: number;
}

@ObjectType()
export class DeleteCategoryOutput extends CoreOutput {}
