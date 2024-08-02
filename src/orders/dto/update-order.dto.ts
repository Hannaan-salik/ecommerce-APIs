import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({ description: 'The ID of the product', required: false })
  productId?: number;

  @ApiProperty({ description: 'The quantity of the product ordered', required: false })
  quantity?: number;
}