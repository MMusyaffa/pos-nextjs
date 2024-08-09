import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { Product } from './interfaces/product.interface.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { Roles } from '../auth/roles.decorator.js';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async create(
    @Body() createProductDto: CreateProductDto,
  ) {
    this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles(['admin', 'cashier'])
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();  
  }
}
