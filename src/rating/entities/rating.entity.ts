import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  RelationId,
} from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/core.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Order } from 'src/order/entities/order.entity';
import { Min } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@InputType('RatingInputType', { isAbstract: true })
@ObjectType()
@Entity('ratings')
export class Rating extends CoreEntity {
  @Field(() => Number)
  @Column()
  @Min(0)
  service: number;

  @Field(() => Number)
  @Column()
  @Min(0)
  taste: number;

  @Field(() => Number)
  @Column()
  @Min(0)
  speed: number;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.ratings, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @RelationId((rating: Rating) => rating.restaurant)
  restaurantId: number;

  @Field(() => Order)
  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.ratings, { onDelete: 'CASCADE' })
  user: User;

  @RelationId((rating: Rating) => rating.user)
  userId: number;
}
