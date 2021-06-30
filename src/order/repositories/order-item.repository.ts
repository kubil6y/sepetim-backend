import { CoreRepository } from 'src/common/core.repository';
import { EntityRepository } from 'typeorm';
import { OrderItem } from '../entities/order-item.entity';

@EntityRepository(OrderItem)
export class OrderItemRepository extends CoreRepository<OrderItem> {}
