import {
  CreateUserInput,
  CreateUserOutput,
  LoginInput,
  LoginOutput,
  UserInput,
  UserOutput,
  GetAllUsersInput,
  GetAllUsersOutput,
  EditUserProfileOutput,
  EditUserProfileInput,
} from './dtos';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Role } from 'src/auth/role.decorator';
import { CurrentUser } from 'src/auth/current-user.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Role('All')
  @Query(() => UserOutput)
  me(@CurrentUser() user: User): UserOutput {
    return { ok: true, user };
  }

  @Role('All')
  @Query(() => UserOutput)
  getUser(@Args('input') { userId }: UserInput): Promise<UserOutput> {
    return this.userService.findUserById(userId);
  }

  @Role('All')
  @Query(() => GetAllUsersOutput)
  getAllUsers(
    @Args('input') getAllUsersInput: GetAllUsersInput,
  ): Promise<GetAllUsersOutput> {
    return this.userService.getAllUsers(getAllUsersInput);
  }

  @Role('All')
  @Mutation(() => EditUserProfileOutput)
  editUserProfile(
    @CurrentUser() user: User,
    @Args('input') editUserProfileInput: EditUserProfileInput,
  ): Promise<EditUserProfileOutput> {
    return this.userService.editUserProfile(user.id, editUserProfileInput);
  }

  @Role('Public')
  @Mutation(() => CreateUserOutput)
  createUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.userService.createUser(createUserInput);
  }

  @Role('Public')
  @Mutation(() => LoginOutput)
  loginUser(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.loginUser(loginInput);
  }
}
