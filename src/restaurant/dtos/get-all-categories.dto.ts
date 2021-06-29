import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaginationInput, PaginationOutput } from 'src/common/dtos';
import { Category } from '../entities/category.entity';

@InputType()
export class GetAllCategoriesInput extends PaginationInput {}

@ObjectType()
export class GetAllCategoriesOutput extends PaginationOutput {
  @Field(() => [Category], { nullable: true })
  results?: Category[];
}
