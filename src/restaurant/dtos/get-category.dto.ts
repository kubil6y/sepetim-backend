import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { Category } from '../entities/category.entity';

@InputType()
export class GetCategoryInput {
  @Field(() => Int)
  categoryId: number;
}

@ObjectType()
export class GetCategoryOutput extends CoreOutput {
  @Field(() => Category, { nullable: true })
  category?: Category;
}
