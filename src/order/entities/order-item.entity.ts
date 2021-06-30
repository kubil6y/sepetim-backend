import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Min } from 'class-validator';
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

  @Field(() => Int)
  @Min(1)
  quantity: number;
}
