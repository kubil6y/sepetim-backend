import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/core.entity';
import { slugify } from 'src/common/helpers';
import { Dish } from 'src/dish/entities/dish.entity';
import { Order } from 'src/order/entities/order.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';

@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
@Entity('restaurants')
export class Restaurant extends CoreEntity {
  @Field(() => String)
  @Column()
  @IsString()
  name: string;

  @Field(() => String)
  @Column()
  @IsString()
  district: string;

  @Field(() => String)
  @Column()
  @IsString()
  logoImg: string;

  @Field(() => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category?: Category;

  @Field(() => [Dish])
  @OneToMany(() => Dish, (dish) => dish.restaurant)
  menu: Dish[];

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];

  @Field(() => [Rating])
  @OneToMany(() => Rating, (rating) => rating.restaurant)
  ratings: Rating[];

  @Field(() => String)
  @Column()
  slug: string;

  @BeforeInsert()
  generateSlug(): void {
    this.slug = slugify(this.name) + '-' + Math.random().toString(36).slice(2);
  }
}
