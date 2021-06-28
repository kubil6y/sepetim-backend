import { CoreRepository } from 'src/common/core.repository';
import { EntityRepository } from 'typeorm';
import { Order } from '../entities/order.entity';

@EntityRepository(Order)
export class OrderRepository extends CoreRepository<Order> {}
