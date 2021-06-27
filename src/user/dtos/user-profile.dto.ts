import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
