import { RateOrderInput, RateOrderOutput, Top5RestaurantsOutput } from './dtos';
import { f, notFound } from 'src/common/errors';
import { Injectable } from '@nestjs/common';
import { RatingRepository } from './repositories/rating.repository';
import { User } from 'src/user/entities/user.entity';
import { RestaurantRepository } from 'src/restaurant/repositories/restaurant.repository';
import { OrderRepository } from 'src/order/repositories/order.repository';
import { ratingValidation } from 'src/common/helpers';

@Injectable()
export class RatingService {
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly restaurantRepository: RestaurantRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async rateOrder(
    client: User,
    { restaurantId, orderId, speed, taste, service }: RateOrderInput,
  ): Promise<RateOrderOutput> {
    try {
      // min 1, max 10 rating!
      if (!ratingValidation({ speed, taste, service })) {
        return f('Invalid ratings');
      }

      const rating = await this.ratingRepository.findOne({
        where: { order: orderId },
      });
      if (rating) return f('You can not rate twice!');

      const restaurant = await this.restaurantRepository.findOne(restaurantId);
      if (!restaurant) return notFound('restaurant');

      const order = await this.orderRepository.findOne(orderId);
      if (!order) return notFound('order');

      if (order.clientId !== client.id) return f('This is not your order');

      // rating
      await this.ratingRepository.save(
        this.ratingRepository.create({
          user: client,
          order,
          restaurant,
          speed,
          taste,
          service,
        }),
      );

      return { ok: true };
    } catch (error) {
      return f('Could not rate');
    }
  }

  async getTopFiveRestaurants(): Promise<Top5RestaurantsOutput> {
    try {
      const ratings = await this.ratingRepository.find({
        take: 5,
        order: {
          taste: 'DESC',
        },
        relations: ['restaurant'],
      });

      return { ok: true, ratings };
    } catch (error) {
      return f('Could not get restaurants');
    }
  }
}
