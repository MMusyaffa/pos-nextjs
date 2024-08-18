import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller.js';
import { ProductsService } from './products.service.js';
import { DatabasesModule } from '../databases/databases.module.js';

@Module({
  imports: [DatabasesModule.deferred()],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
