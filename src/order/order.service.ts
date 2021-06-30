import { CreateOrderInput, CreateOrderOutput } from './dtos';
import { f, notFound } from 'src/common/errors';
import { Injectable } from '@nestjs/common';
import { DishOptionRepository } from 'src/dish/repositories/dish-option.repository';
import { DishRepository } from 'src/dish/repositories/dish.repository';
import { User } from 'src/user/entities/user.entity';
import { OrderItemRepository } from './repositories/order-item.repository';
import { OrderRepository } from './repositories/order.repository';
import { RestaurantRepository } from 'src/restaurant/repositories/restaurant.repository';
import { OrderItem } from './entities/order-item.entity';
import { DishOption } from 'src/dish/entities/dish-option.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly dishRepository: DishRepository,
    private readonly dishOptionRepository: DishOptionRepository,
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async createOrder(
    client: User,
    { restaurantId, items }: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    try {
      const restaurant = await this.restaurantRepository.findOne(restaurantId);
      if (!restaurant) return notFound('restaurant');

      let finalPrice: number = 0;
      const orderItems: OrderItem[] = [];

      for (const item of items) {
        // dish check for one item
        const dish = await this.dishRepository.findOne(item.dishId);
        if (!dish) return notFound('dish');

        // adding base price
        finalPrice += dish.basePrice;

        let dishOption: DishOption = null;
        if (item?.dishOptionId) {
          // dish option checks for one item
          dishOption = await this.dishOptionRepository.findOne(
            item.dishOptionId,
          );
          if (!dishOption) return notFound('dish option');
          if (dishOption.dishId !== item.dishId) {
            return f('This option is not available for this dish');
          }

          // adding extra for dish option
          finalPrice += dishOption.extra;
        }

        const orderItem = await this.orderItemRepository.save(
          this.orderItemRepository.create({
            dish,
            ...(dishOption && { option: dishOption }),
          }),
        );
        orderItems.push(orderItem);
      }

      const order = await this.orderRepository.save(
        this.orderRepository.create({
          items: orderItems,
          total: finalPrice,
          client,
          restaurant,
        }),
      );

      return { ok: true, orderId: order.id };
    } catch (error) {
      return f('Could not create order');
    }
  }
}
