import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { CoreEntity } from 'src/common/core.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { DishOption } from './dish-option.entity';

@InputType('DishInputType', { isAbstract: true })
@ObjectType()
@Entity('dishes')
export class Dish extends CoreEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => Float)
  @Column()
  @Min(0)
  basePrice: number;

  @Field(() => [DishOption], { nullable: true })
  @OneToMany(() => DishOption, (dishOption) => dishOption.dish)
  options?: DishOption[];

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menu)
  restaurant: Restaurant;

  @RelationId((dish: Dish) => dish.restaurant)
  restaurantId: number;
}
