import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import argon2 from 'argon2';
import { IsEmail, IsString, Min, MinLength } from 'class-validator';
import { CoreEntity } from 'src/common/core.entity';
import { Order } from 'src/order/entities/order.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

export enum UserRole {
  Admin = 'Admin',
  Client = 'Client',
  //Owner = 'Owner',
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
  @MinLength(6)
  password: string;

  @Field(() => UserRole, { nullable: true, defaultValue: UserRole.Client })
  @Column({ enum: UserRole, default: UserRole.Client })
  role: UserRole;

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  @Field(() => [Rating])
  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

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
