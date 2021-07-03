import { RateOrderInput, RateOrderOutput, Top5RestaurantsOutput } from './dtos';
import { Role } from 'src/auth/role.decorator';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { RatingService } from './rating.service';
import { Rating } from './entities/rating.entity';
import { CurrentUser } from 'src/auth/current-user.guard';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Rating)
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}

  @Role('All')
  @Query(() => Top5RestaurantsOutput)
  getTopFiveRestaurants() {
    return this.ratingService.getTopFiveRestaurants();
  }

  @Role('Client')
  @Mutation(() => RateOrderOutput)
  rateOrder(
    @CurrentUser() client: User,
    @Args('input') rateOrderInput: RateOrderInput,
  ): Promise<RateOrderOutput> {
    return this.ratingService.rateOrder(client, rateOrderInput);
  }
}
