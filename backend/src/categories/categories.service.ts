import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto.js';
import { Category } from './interfaces/category.interface.js';
import { DatabasesService } from '../databases/databases.service.js';
import { UpdateCategoryDto } from './dtos/update-category.dto.js';
import { Employee } from '../employees/employees.service.js';

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
    },
  ];

  // === Create Category ===
  async create(employee_id: string, createCategoryDto: CreateCategoryDto): Promise<string> {
    // Using mock
    if (process.env.IS_USE_MOCK === 'true') {
      this.categories.push({
        id: `CATEGORY-${new Date().getTime()}`,
        name: createCategoryDto.name,
        image_url: createCategoryDto.image_url,
        is_archived: false,
        created_at: new Date(),
        updated_at: new Date(),
        last_updated_by: employee_id,
      });

      return "Category created successfully";
    }

    // Using database
    try {
      await this.databaseService.getKnex()
        .insert({
          id: `CATEGORY-${new Date().getTime()}`,
          name: createCategoryDto.name,
          image_url: createCategoryDto.image_url,
          is_archived: false,
          created_at: new Date(),
          updated_at: new Date(),
          last_updated_by: employee_id,
        })
        .into('categories');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return "Category created successfully";
  }

  // === Find All Categories ===
  async findAll(): Promise<any> {
    // Using mock
    if (process.env.IS_USE_MOCK === 'true') {
      return this.categories;
    }

    // Using database
    return this.databaseService.getKnex()
      .where('is_archived', false)
      .select('id', 'name', 'image_url')
      .from('categories');
  }

  // === Update Category ===
  async update(id: string, employee_id: string, updateCategoryDto: UpdateCategoryDto): Promise<any> {
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

      return "Category updated successfully";
    }

    // using database
    try {
      
      await this.databaseService.getKnex().transaction(async trx => {
        const category = await trx('categories').select('name', 'image_url', 'is_archived').where({ id }).first();
        if (!category) {
          throw new BadRequestException("Category not found");
        }

        const employee = await trx('employees').select('id').where({ id: employee_id }).first();
        if (!employee) {
          throw new BadRequestException("Employee not found");
        }

        await trx('categories').where({ id }).update({
          name: updateCategoryDto.name || category.name,
          image_url: updateCategoryDto.image_url || category.image_url,
          is_archived: updateCategoryDto.is_archived || category.is_archived,
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

    return "Category updated successfully";
  }

  // === Delete Category ===
  async delete(id: string, employee_id: string): Promise<any> {
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

      return "Category deleted successfully";
    }

    // using database
    try {
      await this.databaseService.getKnex().transaction(async trx => {
        const category = await trx('categories').select('is_archived').where({ id }).first();
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
      });

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(error);
    }

    return "Category deleted successfully";
  }
}
