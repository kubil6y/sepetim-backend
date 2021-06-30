import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/core.entity';
import { DishOption } from 'src/dish/entities/dish-option.entity';
import { Dish } from 'src/dish/entities/dish.entity';
import { Entity, JoinTable, ManyToMany } from 'typeorm';

@InputType('OrderItemInputType', { isAbstract: true })
@ObjectType()
@Entity('order_items')
export class OrderItem extends CoreEntity {
  @Field(() => Dish)
  @ManyToMany(() => Dish)
  @JoinTable()
  dish: Dish;

  @Field(() => DishOption)
  @ManyToMany(() => DishOption)
  @JoinTable()
  option: DishOption;
}
