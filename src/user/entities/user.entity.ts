import argon2 from 'argon2';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  CLIENT = 'CLIENT',
}

registerEnumType(UserRole, { name: 'UserRoleEnum' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity('users')
export class User extends CoreEntity {
  @Field()
  @Column({ unique: true })
  @IsString()
  username: string;

  @Field()
  @Column()
  @IsString()
  firstName: string;

  @Field()
  @Column()
  @IsString()
  lastName: string;

  @Field()
  @Column()
  @IsEmail()
  email: string;

  @Field()
  @Column({ select: false })
  @IsString()
  password: string;

  @Field(() => UserRole, { nullable: true })
  @Column({ enum: UserRole, default: UserRole.CLIENT })
  role?: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!this.password) return;
    this.password = await argon2.hash(this.password);
  }

  validatePassword(plain: string): Promise<Boolean> {
    return argon2.verify(this.password, plain);
  }
}
