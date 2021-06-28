import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import argon2 from 'argon2';
import { IsEmail, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

export enum UserRole {
  Admin = 'Admin',
  Owner = 'Owner',
  Client = 'Client',
}

registerEnumType(UserRole, { name: 'UserRoleEnum' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity('users')
export class User extends CoreEntity {
  @Field(() => String)
  @Column({ unique: true })
  @IsString()
  username: string;

  @Field(() => String)
  @Column()
  @IsString()
  firstName: string;

  @Field(() => String)
  @Column()
  @IsString()
  lastName: string;

  @Field(() => String)
  @Column()
  address: string;

  @Field(() => String)
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: false })
  verified: boolean;

  @Field(() => String)
  @Column({ select: false })
  @IsString()
  password: string;

  @Field(() => UserRole, { nullable: true, defaultValue: UserRole.Client })
  @Column({ enum: UserRole, default: UserRole.Client })
  role: UserRole;

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
