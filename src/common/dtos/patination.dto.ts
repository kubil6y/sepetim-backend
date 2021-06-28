import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../core.output';

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page?: number;
}

@ObjectType()
export class PaginationMeta {
  @Field(() => Int, { nullable: true })
  totalResults?: number;

  @Field(() => Int, { nullable: true })
  totalPages?: number;

  @Field(() => Int, { nullable: true })
  itemsPerPage?: number;
}

@ObjectType()
export class PaginationOutput extends CoreOutput {
  @Field(() => PaginationMeta, { nullable: true })
  meta?: PaginationMeta;
}
