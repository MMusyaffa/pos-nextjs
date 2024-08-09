import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service.js';
import { UploadsController } from './uploads.controller.js';

@Module({
  providers: [UploadsService],
  controllers: [UploadsController]
})
export class UploadsModule {}
