import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/core.entity';
import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';
import { User } from './user.entity';

export enum Cities {
  Istanbul = 'Istanbul',
  Izmir = 'Izmir',
  Eskisehir = 'Eskisehir',
  Antalya = 'Antalya',
  Manisa = 'Manisa',
}

registerEnumType(Cities, { name: 'CitiesEnum' });

@InputType('AddressInputType', { isAbstract: true })
@ObjectType()
@Entity('addresses')
export class Address extends CoreEntity {
  @Field(() => Cities, { defaultValue: Cities.Istanbul })
  @Column({ enum: Cities, default: Cities.Istanbul })
  city: Cities;

  @Field(() => String)
  @Column()
  district: string;

  @Field(() => String)
  @Column()
  street: string;

  @Field(() => Int)
  @Column()
  no: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  doorNumber?: number;

  @Field(() => User)
  @OneToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @RelationId((address: Address) => address.user)
  userId: number;
}
