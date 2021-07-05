import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaginationInput, PaginationOutput } from 'src/common/dtos';
import { Order } from '../entities/order.entity';

@InputType()
export class GetMyOrdersInput extends PaginationInput {}

@ObjectType()
export class GetMyOrdersOutput extends PaginationOutput {
  @Field(() => [Order], { nullable: true })
  results?: Order[];
}
