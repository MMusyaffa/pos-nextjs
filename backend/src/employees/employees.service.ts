import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/create-employee.dto.js';
import { hash, genSalt } from 'bcrypt';
import { bcryptConstants } from '../auth/constants.js';
import { DatabasesService } from '../databases/databases.service.js';
import { UpdateEmployeeRoleDto } from './dtos/update-employee-role.dto.js';
import { ResponseSuccess } from 'src/transform/transform.interceptor.js';

export type Employee = {
  id: string;
  username: string;
  password: string;
  role: string;
  is_active: boolean;
};

const tableName: string = 'employees';

@Injectable()
export class EmployeesService {

  constructor(
    private readonly databaseService: DatabasesService
  ) {}

  private readonly employeesMock: Employee[] = [
    {
      id: 'EMPLOYEE-1',
      username: 'admin',
      password: '$2b$10$mVxdO97O1g8lUvmb/MNI5uMrBPpwJAPB7C0VwbdJ.CMrgXNF.x1Va',
      role: 'admin',
      is_active: true,
    },
    {
      id: 'EMPLOYEE-2',
      username: 'cashier',
      password: '$2b$10$mVxdO97O1g8lUvmb/MNI5uMrBPpwJAPB7C0VwbdJ.CMrgXNF.x1Va',
      role: 'cashier',
      is_active: true,
    }
  ];

  
  // === Find All Employees ===
  async findAll(): Promise<ResponseSuccess<any>> {
    // Using mock
    if (process.env.IS_USE_MOCK === 'true') {
      return {
        message: 'Employees found',
        data: this.employeesMock,
      };
    }

    const data = await this.databaseService.getKnex()
      .select('id', 'username', 'role')
      .where({ is_active: true })
      .from(tableName);

    // Using database
    return {
      message: 'Employees found',
      data,
    };
  }


  // === Find One Employee ===
  async findOne(username: string): Promise<ResponseSuccess<Employee>> {
    // Using mock
    if (process.env.IS_USE_MOCK === 'true') {
      return {
        message: 'Employee found',
        data: this.employeesMock.find(employee => employee.username === username)
      }
    }
    
    const employee: Employee = await this.databaseService.getKnex()
      .select('id', 'username', 'password', 'role')
      .from(tableName)
      .where({ username })
      .first()

    // Using database
    return {
      message: 'Employee found',
      data: employee,
    };
  }


  async getCurrent(employee_id: string): Promise<ResponseSuccess<any>> {
    if (process.env.IS_USE_MOCK === 'true') {
      return {
        message: 'Employee found',
        data: this.employeesMock.find(employee => employee.id === employee_id)
      }
    } else {
      const employee: Employee = await this.databaseService.getKnex()
        .select('id', 'username', 'role')
        .from(tableName)
        .where({ id: employee_id })
        .first();

      return {
        message: 'Employee found',
        data: employee,
      };
    }
  }

  // === Create Employee ===
  async create(createEmployeeDto: CreateEmployeeDto): Promise<ResponseSuccess<any>> {
    // Create employee object
    const inEmployee = new CreateEmployeeDto();
    inEmployee.username = createEmployeeDto.username;
    // hash password
    inEmployee.password = await this.generatePasswordHash(createEmployeeDto.password);
    inEmployee.role = createEmployeeDto.role;

    // Using mock
    if (process.env.IS_USE_MOCK === 'true') {
      const employee = await this.findOne(createEmployeeDto.username);

      if (employee) {
        throw new BadRequestException('Employee already exists');
      }

      // insert employee
      this.employeesMock.push({
        id: `EMPLOYEE-${Date.now()}`,
        is_active: true,
        ...inEmployee,
      });

      return {
        message: 'Employee created',
      };
    }
  
    // Using database
    // transaction
    try {
      await this.databaseService.getKnex().transaction(async trx => {
        const employee: Employee = await trx(tableName).select('username').where({ username: createEmployeeDto.username }).first();

        if (employee) {
          throw new BadRequestException('Employee already exists');
        }
      
        // insert employee
        await trx(tableName).insert({
          id: `EMPLOYEE-${Date.now()}`,
          ...inEmployee,
        });
      });
    } 
    catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create employee');
    }
  
    return {
      message: 'Employee created',
    };
  }


  // === Change Password ===
  async changePassword(employee_id: string, newPassword: string): Promise<ResponseSuccess<any>> {
    // Create employee object
    const inEmployee = new CreateEmployeeDto();
    // hash password
    inEmployee.password = await this.generatePasswordHash(newPassword);

    // Using mock
    if (process.env.IS_USE_MOCK === 'true') {
      const employee = await this.findOne(employee_id);
      if (!employee) {
        throw new BadRequestException('Employee not found');
      }
      
      // update
      const index = this.employeesMock.findIndex(employee => employee.id === employee_id);
      this.employeesMock[index] = {
        id: this.employeesMock[index].id,
        is_active: this.employeesMock[index].is_active,
        ...inEmployee,
      };
      return {
        message: 'Password changed',
      };
    }

    // Using database
    // transaction
    try {
      await this.databaseService.getKnex().transaction(async trx => {
        const employee: Employee = await trx(tableName).select('id').where({ id: employee_id }).first();
        if (!employee) {
          throw new BadRequestException('Employee not found');
        }
      
        // update
        await trx('employee').where({ id: employee_id }).update({
          password: inEmployee.password,
        });
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to change password');
    }

    return {
      message: 'Password changed',
    };
  }

  // === Change Role ===
  async changeRole(employee_id: string, updateEmployeeRoleDto: UpdateEmployeeRoleDto): Promise<ResponseSuccess<any>> {
    // Using mock
    if (process.env.IS_USE_MOCK === 'true') {
      const employee = await this.findOne(employee_id);
      if (!employee) {
        throw new BadRequestException('Employee not found');
      }

      // update
      const index = this.employeesMock.findIndex(employee => employee.id === employee_id);
      this.employeesMock[index] = {
        id: this.employeesMock[index].id,
        username: this.employeesMock[index].username,
        password: this.employeesMock[index].password,
        role: updateEmployeeRoleDto.role,
        is_active: this.employeesMock[index].is_active,
      };

      return {
        message: 'Role changed',
      };
    }

    // Using database
    // transaction
    try {
      await this.databaseService.getKnex().transaction(async trx => {
        const employee: Employee = await trx(tableName).select('id').where({ id: employee_id }).first();
        if (!employee) {
          throw new BadRequestException('Employee not found');
        }
      
        // update
        await trx(tableName).where({ id: employee_id }).update({
          role: updateEmployeeRoleDto.role,
        });
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to change role');
    }

    return {
      message: 'Role changed',
    };
  }

  // === Delete Employee ===
  async delete(employee_id: string): Promise<ResponseSuccess<any>> {
    // Using mock
    if (process.env.IS_USE_MOCK === 'true') {
      const response = await this.findOne(employee_id);
      const employee: Employee = response.data;
      if (!employee) {
        throw new BadRequestException('Employee not found');
      }

      if (employee.role === 'admin') {
        throw new BadRequestException('Cannot delete admin');
      }

      // delete
      const index = this.employeesMock.findIndex(employee => employee.id === employee_id);
      this.employeesMock[index] = {
        id: this.employeesMock[index].id,
        username: this.employeesMock[index].username,
        password: this.employeesMock[index].password,
        role: this.employeesMock[index].role,
        is_active: false,
      };

      return {
        message: 'Employee deleted',
      };
    }

    // Using database
    // transaction
    try {
      await this.databaseService.getKnex().transaction(async trx => {
        const employee: Employee = await trx(tableName).select('id').where({ id: employee_id }).first();
        if (!employee) {
          throw new BadRequestException('Employee not found');
        }

        if (employee.role === 'admin') {
          throw new BadRequestException('Cannot delete admin'); 
        }
      
        // delete
        await trx(tableName).where({ id: employee_id }).update({
          is_active: false,
        });
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete employee');
    }

    return {
      message: 'Employee deleted',
    };
  }

  // Utils
  // === Generate Password Hash ===
  private async generatePasswordHash(password: string): Promise<string> {
    const salt = await genSalt(bcryptConstants.saltRounds);
    return await hash(password, salt);
  }
}
