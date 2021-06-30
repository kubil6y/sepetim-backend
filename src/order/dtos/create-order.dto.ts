import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { CoreOutput } from 'src/common/core.output';

@InputType('CreateOrderItemInputType')
@ObjectType()
export class CreateOrderItemInput {
  @Field(() => Int)
  dishId: number;

  @Field(() => Int)
  dishOptionId?: number;

  @Field(() => Int)
  @Min(1)
  quantity: number;
}

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  restaurantId: number;

  @Field(() => [CreateOrderItemInput])
  items: CreateOrderItemInput[];
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {
  @Field(() => Int, { nullable: true })
  orderId?: number;
}

// TODO two checks are required for this shit.
// 1 is incoming dish option part of the dish?
// 2 is incoming dish part of the restaurant?
// TODO there must be a better way to do this i think.
