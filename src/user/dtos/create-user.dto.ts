import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  //PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends OmitType(User, ['id']) {}

@ObjectType()
export class CreateUserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
