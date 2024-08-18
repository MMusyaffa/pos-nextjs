import { Body, Controller, HttpStatus, ParseFilePipeBuilder, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadsService } from './uploads.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomFileTypeValidator } from './uploads.validator.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { Roles } from '../auth/roles.decorator.js';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Request() req: any,
    @Body()
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: (1 *  1024 * 1024), }) // 1 MB
        .addValidator(new CustomFileTypeValidator({ fileTypes: ['image/png', 'image/jpg', 'image/jpeg'] }))
        .build({
          fileIsRequired: false,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    ) file: Express.Multer.File,
  ) {
    return this.uploadsService.uploadFile(req.employee.sub, file);
  }

  // === Clear unused files locally and in database ===
  @Post('clear')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async clear() {
    return this.uploadsService.clearUnusedFiles();
  }
}
