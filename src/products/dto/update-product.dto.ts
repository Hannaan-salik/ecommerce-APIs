import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ description: 'The name of the product', required: false })
  name?: string;

  @ApiProperty({ description: 'The description of the product', required: false })
  description?: string;

  @ApiProperty({ description: 'The price of the product', required: false })
  price?: number;
}