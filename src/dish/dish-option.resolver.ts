import {
  CreateDishOptionInput,
  CreateDishOptionOutput,
  DeleteDishOptionInput,
  DeleteDishOptionOutput,
  EditDishOptionInput,
  EditDishOptionOutput,
  GetDishOptionInput,
  GetDishOptionOutput,
} from './dtos';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { DishOptionService } from './dish-option.service';
import { Role } from 'src/auth/role.decorator';
import { DishOption } from './entities/dish-option.entity';

@Resolver(() => DishOption)
export class DishOptionResolver {
  constructor(private readonly dishOptionService: DishOptionService) {}

  @Role('Public')
  @Query(() => GetDishOptionOutput)
  getDishOption(
    @Args('input') getDishOptionInput: GetDishOptionInput,
  ): Promise<GetDishOptionOutput> {
    return this.dishOptionService.getDishOption(getDishOptionInput);
  }

  @Role('Admin')
  @Mutation(() => CreateDishOptionOutput)
  createDishOption(
    @Args('input') createDishOptionInput: CreateDishOptionInput,
  ): Promise<CreateDishOptionOutput> {
    return this.dishOptionService.createDishOption(createDishOptionInput);
  }

  @Role('Admin')
  @Mutation(() => EditDishOptionOutput)
  editDishOption(
    @Args('input') editDishOptionInput: EditDishOptionInput,
  ): Promise<EditDishOptionOutput> {
    return this.dishOptionService.editDishOption(editDishOptionInput);
  }

  @Role('Admin')
  @Mutation(() => DeleteDishOptionOutput)
  deleteDishOption(
    @Args('input') deleteDishOptionInput: DeleteDishOptionInput,
  ): Promise<DeleteDishOptionOutput> {
    return this.dishOptionService.deleteDishOption(deleteDishOptionInput);
  }
}
