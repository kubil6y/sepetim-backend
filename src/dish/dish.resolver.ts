import {
  CreateDishInput,
  CreateDishOutput,
  DeleteDishInput,
  DeleteDishOutput,
  EditDishInput,
  EditDishOutput,
  GetDishInput,
  GetDishOutput,
} from './dtos';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/auth/role.decorator';
import { DishService } from './dish.service';
import { Dish } from './entities/dish.entity';

@Resolver(() => Dish)
export class DishResolver {
  constructor(private readonly dishService: DishService) {}

  @Role('Public')
  @Query(() => GetDishOutput)
  getDish(@Args('input') getDishInput: GetDishInput): Promise<GetDishOutput> {
    return this.dishService.getDish(getDishInput);
  }

  @Role('Admin')
  @Mutation(() => CreateDishOutput)
  createDish(
    @Args('input') createDishInput: CreateDishInput,
  ): Promise<CreateDishOutput> {
    return this.dishService.createDish(createDishInput);
  }

  @Role('Admin')
  @Mutation(() => EditDishOutput)
  editDish(
    @Args('input') editDishInput: EditDishInput,
  ): Promise<EditDishOutput> {
    return this.dishService.editDish(editDishInput);
  }

  @Role('Admin')
  @Mutation(() => DeleteDishOutput)
  deleteDish(
    @Args('input') deleteDishInput: DeleteDishInput,
  ): Promise<DeleteDishOutput> {
    return this.dishService.deleteDish(deleteDishInput);
  }
}
