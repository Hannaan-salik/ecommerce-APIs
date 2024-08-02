import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'The ID of the product' })
  productId: number;

  @ApiProperty({ description: 'The quantity of the product ordered' })
  quantity: number;
}