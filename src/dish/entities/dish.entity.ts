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

  @Field(() => String)
  @Column()
  image: string;

  @Field(() => Float)
  @Column()
  calorie: number;

  // TODO typeorm postgres clashes with float! kinda shit
  // github issue: https://github.com/typeorm/typeorm/issues/2812
  @Field(() => Float)
  @Column({ type: 'real' })
  @Min(0)
  basePrice: string;

  @Field(() => [DishOption], { nullable: true })
  @OneToMany(() => DishOption, (dishOption) => dishOption.dish)
  options?: DishOption[];

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menu)
  restaurant: Restaurant;

  @RelationId((dish: Dish) => dish.restaurant)
  restaurantId: number;
}
