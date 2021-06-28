import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
  EditRestaurantInput,
  EditRestaurantOutput,
  GetAllRestaurantsInput,
  GetAllRestaurantsOutput,
  GetRestaurantInput,
  GetRestaurantOutput,
  RestaurantsByCategoryInput,
  RestaurantsByCategoryOutput,
  SearchRestaurantInput,
  SearchRestaurantOutput,
} from './dtos';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResturantService } from './restaurant.service';
import { Role } from 'src/auth/role.decorator';

@Resolver()
export class ResturantResolver {
  constructor(private readonly resturantService: ResturantService) {}

  @Role('Public')
  @Query(() => RestaurantsByCategoryOutput)
  restaurantsByCategory(
    @Args('input') restaurantsByCategoryInput: RestaurantsByCategoryInput,
  ): Promise<RestaurantsByCategoryOutput> {
    return this.resturantService.restaurantsByCategory(
      restaurantsByCategoryInput,
    );
  }

  @Role('Public')
  @Query(() => SearchRestaurantOutput)
  searchRestaurant(
    @Args('input') searchRestaurantInput: SearchRestaurantInput,
  ): Promise<SearchRestaurantOutput> {
    return this.resturantService.searchRestaurant(searchRestaurantInput);
  }

  @Role('Public')
  @Query(() => GetRestaurantOutput)
  getRestaurant(
    @Args('input') getRestaurantInput: GetRestaurantInput,
  ): Promise<GetRestaurantOutput> {
    return this.resturantService.getRestaurant(getRestaurantInput);
  }

  @Role('Public')
  @Query(() => GetAllRestaurantsOutput)
  getAllRestaurants(
    @Args('input') getAllRestaurantsInput: GetAllRestaurantsInput,
  ): Promise<GetAllRestaurantsOutput> {
    return this.resturantService.getAllRestaurants(getAllRestaurantsInput);
  }

  @Role('Admin')
  @Mutation(() => CreateRestaurantOutput)
  createRestaurant(
    @Args('input') createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return this.resturantService.createRestaurant(createRestaurantInput);
  }

  @Role('Admin')
  @Mutation(() => EditRestaurantOutput)
  editRestaurant(
    @Args('input') editRestaurantInput: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {
    return this.resturantService.editRestaurant(editRestaurantInput);
  }

  @Role('Admin')
  @Mutation(() => DeleteRestaurantOutput)
  deleteRestaurant(
    @Args('input') deleteRestaurantInput: DeleteRestaurantInput,
  ): Promise<DeleteRestaurantOutput> {
    return this.resturantService.deleteRestaurant(deleteRestaurantInput);
  }
}