import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { Category } from '../entities/category.entity';

@InputType()
export class CreateCategoryInput extends PickType(Category, [
  'name',
  'logoImg',
]) {}

@ObjectType()
export class CreateCategoryOutput extends CoreOutput {}
