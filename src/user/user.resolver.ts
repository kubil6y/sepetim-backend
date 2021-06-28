import {
  CreateUserInput,
  CreateUserOutput,
  LoginInput,
  LoginOutput,
  UserInput,
  UserOutput,
} from './dtos';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Role } from 'src/auth/role.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Role('All')
  @Query(() => String)
  hello() {
    return 'merhaba mesaji';
  }

  @Role('All')
  @Query(() => UserOutput)
  getUser(@Args('input') { userId }: UserInput): Promise<UserOutput> {
    return this.userService.findUserById(userId);
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
