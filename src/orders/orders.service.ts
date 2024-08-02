import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: createOrderDto.productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${createOrderDto.productId} not found`);
    }
    const totalPrice = product.price * createOrderDto.quantity;
    return this.prisma.order.create({
      data: {
        ...createOrderDto,
        totalPrice,
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    const product = await this.prisma.product.findUnique({
      where: { id: updateOrderDto.productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${updateOrderDto.productId} not found`);
    }
    const totalPrice = product.price * updateOrderDto.quantity;
    return this.prisma.order.update({
      where: { id },
      data: {
        ...updateOrderDto,
        totalPrice,
      },
    });
  }

  async remove(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return this.prisma.order.delete({
      where: { id },
    });
  }
}