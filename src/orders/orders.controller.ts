import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto} from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Order } from '@prisma/client';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The order has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all orders.' })
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return the order with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The order has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The order has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.remove(id);
  }
}