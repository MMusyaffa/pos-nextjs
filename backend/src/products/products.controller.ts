import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { Product } from './interfaces/product.interface.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { UpdateProductDto } from './dtos/update-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async create(
    @Body() createProductDto: CreateProductDto, @Request() req
  ) {
    return this.productsService.create(req.employee.sub, createProductDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles(['admin', 'cashier'])
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();  
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async update(
    @Request() req, @Body() updateProductDto: UpdateProductDto, @Param('id') id: string
  ) {
    return this.productsService.update(id, req.employee.sub, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async delete(
    @Request() req, @Param('id') id: string
  ) {
    return this.productsService.delete(id, req.employee.sub);
  }
}
