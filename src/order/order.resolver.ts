import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.guard';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateOrderInput, CreateOrderOutput } from './dtos';
import { GetMyOrdersInput, GetMyOrdersOutput } from './dtos/get-my-orders.dto';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Role('Client')
  @Mutation(() => CreateOrderOutput)
  createOrder(
    @CurrentUser() client: User,
    @Args('input') createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    return this.orderService.createOrder(client, createOrderInput);
  }

  @Role('Client')
  @Query(() => GetMyOrdersOutput)
  getMyOrders(
    @CurrentUser() user: User,
    @Args('input') getMyOrdersInput: GetMyOrdersInput,
  ): Promise<GetMyOrdersOutput> {
    return this.orderService.getMyOrders(user, getMyOrdersInput);
  }
}
