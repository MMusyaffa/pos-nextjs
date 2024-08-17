import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { CreateEmployeeDto } from './dtos/create-employee.dto.js';
import { EmployeesService } from './employees.service.js';
import { UpdateEmployeeRoleDto } from './dtos/update-employee-role.dto.js';

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

  @Put('changerole/:id')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  update(@Param('id') id: string, @Body() updateEmployeeRoleDto: UpdateEmployeeRoleDto) {
    return this.employeesService.changeRole(id, updateEmployeeRoleDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  delete(@Param('id') id: string, @Request() req) {
    if (req.employee.sub === id) {
      throw new BadRequestException('You cannot delete your own account');
    }
    return this.employeesService.delete(id);
  }
}
