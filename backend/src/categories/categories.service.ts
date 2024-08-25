import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto.js';
import { Category } from './interfaces/category.interface.js';
import { DatabasesService } from '../databases/databases.service.js';
import { UpdateCategoryDto } from './dtos/update-category.dto.js';
import { Employee } from '../employees/employees.service.js';
import { ResponseSuccess } from 'src/transform/transform.interceptor.js';
import { existsSync } from 'fs';

// todo: move to config
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly databaseService: DatabasesService
  ) {}

  // data dummy
  private readonly categories: Category[] = [
    {
      id: 'CATEGORY-1',
      name: 'Electronics',
      image_url: 'electronics.jpg',
      is_archived: false,
      created_at: new Date(),
      updated_at: new Date(),
      last_updated_by: 'EMPLOYEE-1',
      upload_id: null,
    },
  ];

  // === Create Category ===
  async create(employee_id: string, createCategoryDto: CreateCategoryDto): Promise<ResponseSuccess<any>> {
    // Using mock
    if (process.env.IS_USE_MOCK === 'true') {
      const category: Category = {
        id: `CATEGORY-${new Date().getTime()}`,
        name: createCategoryDto.name,
        image_url: createCategoryDto.image_url,
        is_archived: false,
        created_at: new Date(),
        updated_at: new Date(),
        last_updated_by: employee_id,
        upload_id: null,
      }

      this.categories.push(category);

      return {
        message: "Category created successfully",
      }
    }

    // Using database
    try {

      await this.databaseService.getKnex().transaction(async trx => {

        // Check if employee exists
        const employee: Employee = await trx('employees').select('id').where({ id: employee_id }).first();
        if (!employee) {
          throw new BadRequestException("Employee not found");
        }

        // Check if category with the same name exists
        const categoryExists = await trx('categories').select('id').where({ name: createCategoryDto.name }).first();
        if (categoryExists) {
          throw new BadRequestException("Category with the same name already exists");
        }

        // Check if upload exists
        if (createCategoryDto.upload_id) {
          const upload = await trx('uploads').select('id', 'is_used').where({ id: createCategoryDto.upload_id }).first();
          if (!upload || upload.is_used) {
            throw new BadRequestException("Upload not found");
          }
        }

        const category: Category = {
          id: `CATEGORY-${new Date().getTime()}`,
          name: createCategoryDto.name,
          image_url: createCategoryDto.image_url,
          is_archived: false,
          created_at: new Date(),
          updated_at: new Date(),
          last_updated_by: employee_id,
          upload_id: createCategoryDto.upload_id,
        }
  
        await trx('categories').insert(category);

        if (createCategoryDto.upload_id) {
          await trx('uploads').where({ id: createCategoryDto.upload_id }).update({
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
      message: "Category created successfully",
    };
  }

  // === Find All Categories ===
  async findAll(): Promise<ResponseSuccess<any>> {
    // Using mock
    if (process.env.IS_USE_MOCK === 'true') {
      return {
        message: "Find all categories successfully",
        data: this.categories,
      };
    }

    // Using database
    const categories = await this.databaseService.getKnex()
      .where('is_archived', false)
      .leftJoin('uploads', 'categories.upload_id', 'uploads.id')
      .select('categories.id', 'categories.name', 'categories.image_url', 'categories.upload_id', 'uploads.filename as upload_filename')
      .from('categories');

    return {
      message: "Find all categories successfully", 
      data: categories.map(category => ({
        id: category.id,
        name: category.name,
        image_url: category.upload_id 
        ? (this.checkIfImageExists(category.upload_filename) && `${BASE_URL}${category.upload_filename}`) 
        : category.image_url || '',
      })),
    };
  }

  // === Update Category ===
  async update(id: string, employee_id: string, updateCategoryDto: UpdateCategoryDto): Promise<ResponseSuccess<any>> {
    // using mock
    if (process.env.IS_USE_MOCK === 'true') {
      const category = this.categories.find(category => category.id === id);

      if (!category) {
        throw new BadRequestException("Category not found");
      }

      if (category) {
        category.name = updateCategoryDto.name || category.name;
        category.image_url = updateCategoryDto.image_url || category.image_url;
        category.is_archived = updateCategoryDto.is_archived || category.is_archived;
        category.updated_at = new Date();
        category.last_updated_by = employee_id;
      }

      return { message: "Category updated successfully",};
    }

    // using database
    try {
      
      await this.databaseService.getKnex().transaction(async trx => {

        // Check if category exists
        const category = await trx('categories').select('id', 'name', 'is_archived', 'image_url', 'upload_id').where({ id }).first();
        if (!category) {
          throw new BadRequestException("Category not found");
        }

        // Check if employee exists
        const employee = await trx('employees').select('id').where({ id: employee_id }).first();
        if (!employee) {
          throw new BadRequestException("Employee not found");
        }

        // Check if upload exists
        if (updateCategoryDto.upload_id) {
          const upload = await trx('uploads').select('id', 'is_used').where({ id: updateCategoryDto.upload_id }).first();
          if (!upload || upload.is_used) {
            throw new BadRequestException("Upload not found");
          }
        }

        await trx('categories').where({ id }).update({
          name: updateCategoryDto.name || category.name,
          image_url: updateCategoryDto.image_url || category.image_url,
          is_archived: updateCategoryDto.is_archived || category.is_archived,
          updated_at: new Date(),
          last_updated_by: employee_id,
          upload_id: updateCategoryDto.upload_id || category.upload_id,
        });

        // Update upload
        if (updateCategoryDto.upload_id) {
          await trx('uploads').where({ id: category.upload_id }).update({
            is_used: false,
            updated_at: new Date(),
            last_updated_by: employee_id,
          });

          await trx('uploads').where({ id: updateCategoryDto.upload_id }).update({
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
      message: "Category updated successfully",
    };
  }

  // === Delete Category ===
  async delete(id: string, employee_id: string): Promise<ResponseSuccess<any>> {
    // using mock
    if (process.env.IS_USE_MOCK === 'true') {
      const category = this.categories.find(category => category.id === id);

      if (!category) {
        throw new BadRequestException("Category not found");
      }

      if (category) {
        category.is_archived = true;
        category.updated_at = new Date();
        category.last_updated_by = employee_id;
      }

      return {
        message: "Category deleted successfully",
      };
    }

    // using database
    try {
      await this.databaseService.getKnex().transaction(async trx => {
        const category = await trx('categories').select('id', 'upload_id').where({ id }).first();
        if (!category) {
          throw new BadRequestException("Category not found");
        }

        const employee = await trx('employees').select('id').where({ id: employee_id }).first();
        if (!employee) {
          throw new BadRequestException("Employee not found");
        }

        await trx('categories').where({ id }).update({
          is_archived: true,
          updated_at: new Date(),
          last_updated_by: employee_id,
        });

        // Update upload
        await trx('uploads').where({ id: category.upload_id }).update({
          is_used: false,
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
      message: "Category deleted successfully",
    };
  }

  // check if image exists in public folder
  private checkIfImageExists(filename: string): boolean {
    return existsSync(`public/${filename}`)
  }
}
