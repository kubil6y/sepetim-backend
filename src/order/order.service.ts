import {
  CreateOrderInput,
  CreateOrderOutput,
  GetMyOrdersInput,
  GetMyOrdersOutput,
} from './dtos';
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

      let totalCalories = 0;
      let finalPrice: number = 0;
      const orderItems: OrderItem[] = [];

      for (const item of items) {
        if (item.quantity < 1) return f('Invalid Values');
        // dish check for one item
        const dish = await this.dishRepository.findOne(item.dishId);
        if (!dish) return notFound('dish');

        // adding base price
        if (+dish.basePrice < 0) return f('Invalid Values');
        finalPrice += +dish.basePrice * item.quantity;
        totalCalories += dish.calorie * item.quantity;

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
          if (dishOption.extra < 0) return f('Invalid Values');
          finalPrice += dishOption.extra * item.quantity;
          totalCalories += dishOption.calorie * item.quantity;
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
          totalCalories,
        }),
      );

      return { ok: true, orderId: order.id };
    } catch (error) {
      return f('Could not create order');
    }
  }

  async getMyOrders(
    user: User,
    { page }: GetMyOrdersInput,
  ): Promise<GetMyOrdersOutput> {
    try {
      const { meta, results } = await this.orderRepository.paginate({
        where: { client: user },
        take: 5,
        ...(page && { page }),
        relations: ['restaurant', 'restaurant.category'],
      });

      return { ok: true, meta, results };
    } catch (error) {
      return f('Could not load your orders');
    }
  }
}
