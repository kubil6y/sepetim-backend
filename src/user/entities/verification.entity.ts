import { v4 as uuidv4 } from 'uuid';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { trimSlashes } from 'src/common/helpers';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { CoreEntity } from 'src/common/core.entity';

@InputType('VerificationInputType', { isAbstract: true })
@ObjectType()
@Entity('verifications')
export class Verification extends CoreEntity {
  @Field(() => String)
  @Column()
  code: string;

  @Field(() => User)
  @OneToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @BeforeInsert()
  generateCode(): void {
    this.code = trimSlashes(uuidv4());
  }
}
