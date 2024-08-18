import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service.js';
import { UploadsController } from './uploads.controller.js';
import { DatabasesModule } from '../databases/databases.module.js';

@Module({
  imports: [DatabasesModule.deferred()],
  providers: [UploadsService],
  controllers: [UploadsController]
})
export class UploadsModule {}
