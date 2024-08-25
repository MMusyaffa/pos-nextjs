import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Product } from './interfaces/product.interface.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { DatabasesService } from '../databases/databases.service.js';
import { GetProductDto } from './dtos/get-product.dto.js';
import { UpdateProductDto } from './dtos/update-product.dto.js';
import { ResponseSuccess } from '../transform/transform.interceptor.js';

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
      upload_id: null,
    },
  ]

  // === Create Product ===
  async create(employee_id: string, createProductDto: CreateProductDto): Promise<ResponseSuccess<any>> {
    // Using mock
    if (process.env.IS_USE_MOCK === 'true') {
      const product: Product = {
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
        upload_id: createProductDto.upload_id || null,
      };

      this.products.push(product);

      return {
        message: "Product created successfully",
      };
    }

    // Using database
    try {
      await this.databaseService.getKnex().transaction(async trx => {

        // check employee
        const employee = await trx('employees')
          .select('id')
          .where('id', employee_id)
          .first();
        if (!employee) {
          throw new BadRequestException('Employee not found');
        }

        // check category
        if (createProductDto.category_id){
          const category = await trx('categories')
            .select('id')
            .where({id: createProductDto.category_id})
            .first();
          if (!category) {
            throw new BadRequestException('Category not found');
          }
        }

        // check upload file
        if (createProductDto.upload_id){
          const uploadFile = await trx('uploads')
            .select('id', 'is_used')
            .where({id: createProductDto.upload_id})
            .first();
          if (!uploadFile || uploadFile.is_used) {
            throw new BadRequestException('Upload file not found');
          }
        }

        const product: Product = {
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
          upload_id: createProductDto.upload_id || null,
        };

        await trx('products').insert(product);

        // update upload file
        if (createProductDto.upload_id){
          await trx('uploads').where({id: createProductDto.upload_id}).update({
            is_used: true,
            updated_at: new Date(),
            last_updated_by: employee_id,
          });
        }
        
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }

    return {
      message: "Product created successfully",
    };
  }

  // === Find All Products ===
  async findAll(): Promise<ResponseSuccess<any>> {
    // Using mock
    if (process.env.IS_USE_MOCK === 'true') {
      return {
        message: "Find all products successfully",
        data: this.products,
      }
    }

    // Using database
    const products = await this.databaseService.getKnex()
      .where('products.is_archived', false)
      .leftJoin('categories', 'products.category_id', 'categories.id')
      .leftJoin('uploads', 'products.upload_id', 'uploads.id')
      .select('products.id', 'products.name', 'products.price', 'products.description', 'products.image_url', 'products.category_id', 'products.upload_id','categories.name as category_name', 'categories.is_archived as category_is_archived', 'uploads.filename as upload_filename')
      .from('products');
    
    const getProductDto: GetProductDto[] = products.map(product => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image_url: product.upload_id ? `${BASE_URL}${product.upload_filename}` : product.image_url,
        category_id: product.category_id ? (product.category_is_archived ? '' : product.category_id) : '',
        category_name: product.category_id ? (product.category_is_archived ? '' : product.category_name) : '',
      }
    });

    return {
      message: "Find all products successfully",
      data: getProductDto,
    };
  }

  // === Update Product ===
  async update(id: string, employee_id: string, updateProductDto: UpdateProductDto): Promise<ResponseSuccess<any>> {
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

      return {
        message: "Product updated successfully",
      };
    }

    // using database
    try {
      await this.databaseService.getKnex().transaction(async trx => {

        // check employee
        const employee = await trx('employees')
          .select('id')
          .where({ id: employee_id})
          .first();
        if (!employee) {
          throw new BadRequestException('Employee not found');
        }

        // check product
        const product = await trx('products')
          .select('id', 'name', 'price', 'description', 'category_id', 'image_url', 'is_archived', 'upload_id')
          .where({id})
          .first();
        if (!product || product.is_archived) {
          throw new BadRequestException('Product not found');
        }

        // check category
        if (updateProductDto.category_id){
          const category = await trx('categories')
            .select('id', 'is_archived')
            .where({id: updateProductDto.category_id})
            .first();
          if (!category || category.is_archived) {
            throw new BadRequestException('Category not found');
          }
        }

        // check upload file
        if (updateProductDto.upload_id){
          const uploadFile = await trx('uploads')
            .select('id', 'is_used')
            .where({id: updateProductDto.upload_id})
            .first();
          if (!uploadFile || uploadFile.is_used) {
            throw new BadRequestException('Upload file not found');
          }
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

        // update upload file
        if (updateProductDto.upload_id){

          // update previous upload
          await trx('uploads').where({id: product.upload_id}).update({
            is_used: false,
            updated_at: new Date(),
            last_updated_by: employee_id,
          });

          // update new upload
          await trx('uploads').where({id: updateProductDto.upload_id}).update({
            is_used: true,
            updated_at: new Date(),
            last_updated_by: employee_id,
          });
        }
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }

    return {
      message: "Product updated successfully",
    };
  }

  // === Delete Product ===
  async delete(id: string, employee_id: string): Promise<ResponseSuccess<any>> {
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

      return {
        message: "Product deleted successfully",
      };
    }

    // using database
    try {
      await this.databaseService.getKnex().transaction(async trx => {
        const employee = await trx('employees').select('id').where('id', employee_id).first();
        if (!employee) {
          throw new BadRequestException('Employee not found');
        }

        const product = await trx('products').select('id', 'is_archived').where('id', id).first();
        if (!product || product.is_archived) {
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

    return {
      message: "Product deleted successfully",
    };
  }
}
