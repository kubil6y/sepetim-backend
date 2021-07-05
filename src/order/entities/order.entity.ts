import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { CoreEntity } from 'src/common/core.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

@InputType('OrderInputType', { isAbstract: true })
@ObjectType()
@Entity('orders')
export class Order extends CoreEntity {
  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  client: User;

  @RelationId((order: Order) => order.client)
  clientId: number;

  @Field(() => Number)
  @Column()
  @Min(0)
  total: number;

  @Field(() => Boolean)
  @Column({ default: false })
  rated: boolean;

  @Field(() => Number)
  @Column()
  @Min(0)
  totalCalories: number;

  @Field(() => [OrderItem])
  @ManyToMany(() => OrderItem)
  @JoinTable()
  items: OrderItem[];
}
