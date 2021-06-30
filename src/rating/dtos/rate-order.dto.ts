import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { CoreOutput } from 'src/common/core.output';

@InputType()
export class RateOrderInput {
  @Field(() => Int)
  restaurantId: number;

  @Field(() => Int)
  orderId: number;

  @Field(() => Int)
  @Max(10)
  @Min(0)
  service: number;

  @Field(() => Int)
  @Max(10)
  @Min(0)
  taste: number;

  @Field(() => Int)
  @Max(10)
  @Min(0)
  speed: number;
}

@ObjectType()
export class RateOrderOutput extends CoreOutput {}
