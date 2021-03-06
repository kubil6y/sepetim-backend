import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/core.entity';
import { slugify } from 'src/common/helpers';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Entity('categories')
export class Category extends CoreEntity {
  @Field(() => String)
  @Column({ unique: true })
  name: string;

  @Field(() => String)
  @Column()
  logoImg: string;

  @Field(() => [Restaurant])
  @OneToMany(() => Restaurant, (restaurant) => restaurant.category)
  restaurants: Restaurant[];

  @Field(() => String)
  @Column()
  slug: string;

  @BeforeInsert()
  generateSlug(): void {
    this.slug = slugify(this.name.toLowerCase());
  }
}
