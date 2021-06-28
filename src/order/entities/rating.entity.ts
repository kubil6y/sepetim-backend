import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/core.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from 'typeorm';
import { Order } from './order.entity';

@InputType('RatingInputType', { isAbstract: true })
@ObjectType()
@Entity('ratings')
export class Rating extends CoreEntity {
  //@Field(() => Restaurant)
  //@OneToOne(() => Restaurant, { onDelete: 'CASCADE' })
  //@JoinColumn()
  //restaurant: Restaurant;
  //@Field(() => User)
  //@ManyToOne(() => User, (user) => user.ratings)
  //user: User;
  //@RelationId((rating: Rating) => rating.user)
  //ownerId: number;
  //@Field(() => Order)
  //@OneToOne(() => Order, { onDelete: 'CASCADE' })
  //@JoinColumn()
  //order: Order;
}
