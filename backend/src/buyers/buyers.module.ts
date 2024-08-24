import { Module } from '@nestjs/common';
import { BuyersService } from './buyers.service.js';
import { BuyersController } from './buyers.controller.js';
import { DatabasesModule } from '../databases/databases.module.js';

@Module({
  imports: [DatabasesModule.deferred()],
  providers: [BuyersService],
  controllers: [BuyersController]
})
export class BuyersModule {}
