import { InputType, ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { CoreEntity } from 'src/common/core.entity';
import { Entity, Column, ManyToOne, RelationId } from 'typeorm';
import { Dish } from './dish.entity';

@InputType('DishOptionInputType', { isAbstract: true })
@ObjectType()
@Entity('dish_options')
export class DishOption extends CoreEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Float)
  @Column()
  @Min(0)
  extra: number;

  @Field(() => Int)
  @Column()
  @Min(0)
  calorie: number;

  @Field(() => Dish)
  @ManyToOne(() => Dish, { onDelete: 'CASCADE' })
  dish: Dish;

  @RelationId((dishOption: DishOption) => dishOption.dish)
  dishId: number;
}
