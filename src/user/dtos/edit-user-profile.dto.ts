import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { User } from '../entities/user.entity';

@InputType()
export class EditUserProfileInput extends PartialType(
  PickType(User, [
    'firstName',
    'lastName',
    'email',
    'password',
    'address',
  ] as const),
) {}

@ObjectType()
export class EditUserProfileOutput extends CoreOutput {}
