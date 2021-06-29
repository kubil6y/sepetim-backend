import {
  CreateCategoryInput,
  CreateCategoryOutput,
  DeleteCategoryInput,
  DeleteCategoryOutput,
  EditCategoryInput,
  EditCategoryOutput,
  GetAllCategoriesInput,
  GetAllCategoriesOutput,
  GetCategoryInput,
  GetCategoryOutput,
  RestaurantsByCategoryInput,
  RestaurantsByCategoryOutput,
} from './dtos';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/auth/role.decorator';
import { CategoryService } from './category.service';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Role('Public')
  @Query(() => GetCategoryOutput)
  getCategory(
    @Args('input') getCategoryInput: GetCategoryInput,
  ): Promise<GetCategoryOutput> {
    return this.categoryService.getCategory(getCategoryInput);
  }

  @Role('Public')
  @Query(() => GetAllCategoriesOutput)
  getAllCategories(
    @Args('input') getAllCategoriesInput: GetAllCategoriesInput,
  ): Promise<GetAllCategoriesOutput> {
    return this.categoryService.getAllCategories(getAllCategoriesInput);
  }

  @Role('Public')
  @Query(() => RestaurantsByCategoryOutput)
  restaurantsByCategory(
    @Args('input') restaurantsByCategoryInput: RestaurantsByCategoryInput,
  ): Promise<RestaurantsByCategoryOutput> {
    return this.categoryService.restaurantsByCategory(
      restaurantsByCategoryInput,
    );
  }

  @Role('Admin')
  @Mutation(() => CreateCategoryOutput)
  createCategory(
    @Args('input') createCategoryInput: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    return this.categoryService.createCategory(createCategoryInput);
  }

  @Role('Admin')
  @Mutation(() => EditCategoryOutput)
  editCategory(
    @Args('input') editCategoryInput: EditCategoryInput,
  ): Promise<EditCategoryOutput> {
    return this.categoryService.editCategory(editCategoryInput);
  }

  @Role('Admin')
  @Mutation(() => DeleteCategoryOutput)
  deleteCategory(
    @Args('input') deleteCategoryInput: DeleteCategoryInput,
  ): Promise<DeleteCategoryOutput> {
    return this.categoryService.deleteCategory(deleteCategoryInput);
  }
}
