import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface.js';
import { CreateProductDto } from './dtos/create-product.dto.js';

// todo: move to config
const BASE_URL = 'http://localhost:3000/public/';

@Injectable()
export class ProductsService {

  // data dummy
  private readonly products: Product[] = [
    {
      id: '1',
      name: 'NestJS Zero to Hero',
      price: 2900,
      description: 'Learn to build APIs with NestJS',
      image_url: 'nestjs-zero-to-hero.png',
      is_archived: false,
      created_at: new Date(),
      updated_at: new Date(),
      last_updated_by: 'admin',
    },
  ]

  // === Create Product ===
  create(createProductDto: CreateProductDto) {
    // Using mock
    if (process.env.IS_USE_MOCK === 'true') {
      this.products.push({
        id: Math.random().toString(36).substr(2, 9),
        name: createProductDto.title,
        price: createProductDto.price,
        description: createProductDto.description,
        image_url: createProductDto.image_url,
        is_archived: false,
        created_at: new Date(),
        updated_at: new Date(),
        last_updated_by: createProductDto.last_updated_by,
      });
    }
  }

  // === Find All Products ===
  findAll(): Product[] {
    // Using mock
    if (process.env.IS_USE_MOCK === 'true') {
      return this.products.map(product => {
        return product.image_url.includes('http') || product.image_url.includes('https') ? product : { ...product, image_url: `${BASE_URL}${product.image_url}` }
      });
    }
  }
}
