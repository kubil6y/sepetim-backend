import { Module } from '@nestjs/common';
import { Field } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from 'typeorm';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { OrderRepository } from './repositories/order.repository';
import { RatingRepository } from './repositories/rating.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository, RatingRepository])],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
