import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { CategoriesController } from './categories.controller.js';
import { DatabasesModule } from '../databases/databases.module.js';

@Module({
  imports: [DatabasesModule.deferred()],
  providers: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
