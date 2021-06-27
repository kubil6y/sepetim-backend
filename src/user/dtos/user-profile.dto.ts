import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { User } from '../entities/user.entity';

@InputType()
export class UserInput {
  @Field(() => Int)
  userId: number;
}

@ObjectType()
export class UserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
