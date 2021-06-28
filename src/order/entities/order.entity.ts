import { InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/core.entity';
import { Entity } from 'typeorm';

@InputType('OrderInputType', { isAbstract: true })
@ObjectType()
@Entity('orders')
export class Order extends CoreEntity {}
