import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.output';
import { Verification } from '../entities/verification.entity';

@InputType()
export class VerifyEmailInput extends PickType(Verification, ['code']) {}

@ObjectType()
export class VerifyEmailOutput extends CoreOutput {}
