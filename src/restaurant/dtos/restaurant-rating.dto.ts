import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RatingsOutput {
  @Field(() => Number, { nullable: true })
  service?: number;

  @Field(() => Number, { nullable: true })
  speed?: number;

  @Field(() => Number, { nullable: true })
  taste?: number;
}
