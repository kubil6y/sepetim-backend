import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaginationInput, PaginationOutput } from 'src/common/dtos';
import { User } from '../entities/user.entity';

@InputType()
export class GetAllUsersInput extends PaginationInput {}

@ObjectType()
export class GetAllUsersOutput extends PaginationOutput {
  @Field(() => [User], { nullable: true })
  results?: User[];
}
