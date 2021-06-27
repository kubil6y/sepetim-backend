import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';

@InputType()
export class LoginInput {
  @Field(() => String)
  credentials: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class LoginOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
