import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service.js';
import { EmployeesController } from './employees.controller.js';
import { DatabasesModule } from '../databases/databases.module.js';

@Module({
  imports: [DatabasesModule.deferred()],
  providers: [EmployeesService],
  exports: [EmployeesService],
  controllers: [EmployeesController]
})
export class EmployeesModule {}