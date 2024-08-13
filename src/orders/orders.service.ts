import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: createOrderDto.productId },
      });
      if (!product) {
        throw new HttpException(`Product with ID ${createOrderDto.productId} not found`, HttpStatus.NOT_FOUND);
      }
      const totalPrice = product.price * createOrderDto.quantity;
      return await this.prisma.order.create({
        data: {
          ...createOrderDto,
          totalPrice,
        },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Failed to create order:', error);
      throw new HttpException('Failed to create order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.prisma.order.findMany();
    } catch (error) {
      console.error('Failed to retrieve orders:', error);
      throw new HttpException('Failed to retrieve orders', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id },
      });
      if (!order) {
        throw new HttpException(`Order with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }
      return order;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Failed to retrieve order:', error);
      throw new HttpException('Failed to retrieve order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id },
      });
      if (!order) {
        throw new HttpException(`Order with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }
      const product = await this.prisma.product.findUnique({
        where: { id: updateOrderDto.productId },
      });
      if (!product) {
        throw new HttpException(`Product with ID ${updateOrderDto.productId} not found`, HttpStatus.NOT_FOUND);
      }
      const totalPrice = product.price * updateOrderDto.quantity;
      return await this.prisma.order.update({
        where: { id },
        data: {
          ...updateOrderDto,
          totalPrice,
        },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Failed to update order:', error);
      throw new HttpException('Failed to update order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id },
      });
      if (!order) {
        throw new HttpException(`Order with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }
      return await this.prisma.order.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Failed to delete order:', error);
      throw new HttpException('Failed to delete order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}