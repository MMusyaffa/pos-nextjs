import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Product } from './interfaces/product.interface.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { DatabasesService } from '../databases/databases.service.js';

// todo: move to config
const BASE_URL = 'http://localhost:3000/public/';

@Injectable()
export class ProductsService {

  constructor(
    private readonly databaseService: DatabasesService
  ) {}

  // data dummy
  private readonly products: Product[] = [
    {
      id: '1',
      name: 'NestJS Zero to Hero',
      price: 2900,
      description: 'Learn to build APIs with NestJS',
      category_id: 'CATEGORY-2',
      image_url: 'nestjs-zero-to-hero.png',
      is_archived: false,
      created_at: new Date(),
      updated_at: new Date(),
      last_updated_by: 'EMPLOYEE-1',
    },
  ]

  // === Create Product ===
  async create(employee_id: string, createProductDto: CreateProductDto): Promise<any> {
    // Using mock
    if (process.env.IS_USE_MOCK === 'true') {
      this.products.push({
        id: `PRODUCT-${new Date().getTime()}`,
        name: createProductDto.name,
        price: createProductDto.price,
        description: createProductDto.description,
        category_id: createProductDto.category_id || null,
        image_url: createProductDto.image_url,
        is_archived: false,
        created_at: new Date(),
        updated_at: new Date(),
        last_updated_by: employee_id,
      });

      return "Product created successfully";
    }

    // Using database
    try {
      await this.databaseService.getKnex().transaction(async trx => {

        const employee = await trx('employees').where('id', employee_id).first();
        if (!employee) {
          throw new BadRequestException('Employee not found');
        }

        await trx('products').insert({
          id: `PRODUCT-${new Date().getTime()}`,
          name: createProductDto.name,
          price: createProductDto.price,
          description: createProductDto.description || '',
          category_id: createProductDto.category_id || null,
          image_url: createProductDto.image_url || '',
          is_archived: false,
          created_at: new Date(),
          updated_at: new Date(),
          last_updated_by: employee_id,
        });
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }

    return "Product created successfully";
  }

  // === Find All Products ===
  async findAll(): Promise<any> {
    // Using mock
    if (process.env.IS_USE_MOCK === 'true') {
      return this.products.map(product => {
        return product.image_url.includes('http') || product.image_url.includes('https') ? product : { ...product, image_url: `${BASE_URL}${product.image_url}` }
      });
    }

    // Using database
    const products = await this.databaseService.getKnex()
      .where('products.is_archived', false)
      .leftJoin('categories', 'products.category_id', 'categories.id')
      .select('products.id', 'products.name', 'products.price', 'products.description', 'products.image_url', 'products.category_id', 'categories.name as category_name', 'categories.is_archived as category_is_archived')
      .from('products');
    
    return products.map(product => {
      const {category_is_archived, ...p} = product;
      p.category_id = category_is_archived ? null : p.category_id;
      p.category_name = category_is_archived ? null : p.category_name;
      p.image_url = p.image_url.includes('http') || product.image_url.includes('https') 
        ? p.image_url
        : p.image_url && `${BASE_URL}${product.image_url}`
      return p;
    });
  }

  // === Update Product ===
  async update(id: string, employee_id: string, updateProductDto: CreateProductDto): Promise<any> {
    // using mock
    if (process.env.IS_USE_MOCK === 'true') {
      const product = this.products.find(product => product.id === id);

      if (!product) {
        throw new BadRequestException("Product not found");
      }

      if (product) {
        product.name = updateProductDto.name || product.name;
        product.price = updateProductDto.price || product.price;
        product.description = updateProductDto.description || product.description;
        product.category_id = updateProductDto.category_id || product.category_id;
        product.image_url = updateProductDto.image_url || product.image_url;
        product.updated_at = new Date();
        product.last_updated_by = employee_id;
      }

      return "Product updated successfully";
    }

    // using database
    try {
      await this.databaseService.getKnex().transaction(async trx => {
        const employee = await trx('employees').where('id', employee_id).first();
        if (!employee) {
          throw new BadRequestException('Employee not found');
        }

        const product = await trx('products').where('id', id).first();
        if (!product) {
          throw new BadRequestException('Product not found');
        }

        await trx('products').where('id', id).update({
          name: updateProductDto.name || product.name,
          price: updateProductDto.price || product.price,
          description: updateProductDto.description || product.description,
          category_id: updateProductDto.category_id || product.category_id,
          image_url: updateProductDto.image_url || product.image_url,
          updated_at: new Date(),
          last_updated_by: employee_id,
        });
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }

    return "Product updated successfully";
  }

  // === Delete Product ===
  async delete(id: string, employee_id: string): Promise<any> {
    // using mock
    if (process.env.IS_USE_MOCK === 'true') {
      const productIndex = this.products.findIndex(product => product.id === id);

      if (productIndex === -1) {
        throw new BadRequestException("Product not found");
      }

      this.products[productIndex] = {
        ...this.products[productIndex],
        is_archived: true,
        updated_at: new Date(),
        last_updated_by: employee_id,
      };

      return "Product deleted successfully";
    }

    // using database
    try {
      await this.databaseService.getKnex().transaction(async trx => {
        const employee = await trx('employees').where('id', employee_id).first();
        if (!employee) {
          throw new BadRequestException('Employee not found');
        }

        const product = await trx('products').where('id', id).first();
        if (!product) {
          throw new BadRequestException('Product not found');
        }

        await trx('products').where('id', id).update({
          is_archived: true,
          updated_at: new Date(),
          last_updated_by: employee_id,
        });
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }

    return "Product deleted successfully";
  }
}
