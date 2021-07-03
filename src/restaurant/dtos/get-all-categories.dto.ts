import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { Category } from '../entities/category.entity';

@ObjectType()
export class GetAllCategoriesOutput extends CoreOutput {
  @Field(() => [Category], { nullable: true })
  categories?: Category[];
}
