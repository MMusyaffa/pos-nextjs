import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { Roles } from '../auth/roles.decorator.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { CreateCategoryDto } from './dtos/create-category.dto.js';
import { UpdateCategoryDto } from './dtos/update-category.dto.js';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  // === Create Category ===
  @Post()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    return this.categoriesService.create(req.employee.sub, createCategoryDto);
  }

  // === Find All Categories ===
  @Get()
  @UseGuards(AuthGuard)
  @Roles(['admin', 'cashier'])
  findAll() {
    return this.categoriesService.findAll();
  }

  // === Update Category ===
  @Put(':id')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  update(@Param('id') id: string ,@Body() updateCategoryDto: UpdateCategoryDto, @Request() req) {
    return this.categoriesService.update(id, req.employee.sub, updateCategoryDto);
  }

  // === Delete Category ===
  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  delete(@Param('id') id: string, @Request() req) {
    return this.categoriesService.delete(id, req.employee.sub);
  }
  
}
