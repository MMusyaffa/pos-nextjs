import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { CreateEmployeeDto } from './dtos/create-employee.dto.js';
import { EmployeesService } from './employees.service.js';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  findAll() {
    return this.employeesService.findAll();
  }
}
