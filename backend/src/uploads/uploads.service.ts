import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { writeFile, rm } from 'fs/promises';
import { DatabasesService } from '../databases/databases.service.js';
import { existsSync } from 'fs';

interface UploadFile {
  id: string;
  filename: string;
  is_used: boolean;
  created_at: Date;
  updated_at: Date;
  last_updated_by: string;
}

@Injectable()
export class UploadsService {

  constructor(
    private readonly databaseService: DatabasesService
  ) {}

  // === Upload file locally and save to database ===
  async uploadFile(employee_id: string, file: Express.Multer.File): Promise<any> {
    var randomName = `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`;
    return new Promise((resolve, reject) => {
      writeFile(`public/${randomName}`, file.buffer)
        .then(async () => {
          if (process.env.IS_USE_MOCK !== 'true') {
            try {
              const uploadFile: UploadFile = {
                id: `IMG-${Date.now()}`,
                filename: randomName,
                is_used: false,
                created_at: new Date(),
                updated_at: new Date(),
                last_updated_by: employee_id,
              };

              await this.databaseService.getKnex().transaction(async (trx) => {
                const employee = await trx('employees').select('id').where({id: employee_id}).first();
                if (!employee) {
                  throw new Error('Employee not found');
                }
                await trx('uploads').insert(uploadFile);
              });
              resolve({ id: uploadFile.id, filename: uploadFile.filename });
            } catch (err) {
              throw err;
            }
          }
          resolve(randomName)
        })
        .catch((err) => {
          // remove file if error
          rm(`public/${randomName}`);
          reject(err);
        });
    });
  }

  // === Clear unused files locally and in database ===
  async clearUnusedFiles(): Promise<string> {
    if (process.env.IS_USE_MOCK !== 'true') {
      try {

        await this.databaseService.getKnex().transaction(async (trx) => {
          const files = await trx('uploads').select('filename').where({is_used: false});
          
          await trx('uploads').where({is_used: false}).del();

          for (const file of files) {
            // check if file exists
            if (existsSync(`public/${file.filename}`)) {
              rm(`public/${file.filename}`);
            }
          }
        });
      } catch (err) {
        throw new InternalServerErrorException('Failed to clear files');
      }

      return 'Files cleared';
    }
  }


}