import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';

@Injectable()
export class UploadsService {

  uploadFile(file: Express.Multer.File): Promise<string> {
    var randomName = `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`;
    return new Promise((resolve, reject) => {
      writeFile(`public/${randomName}`, file.buffer)
        .then(() => resolve(randomName))
        .catch((err) => reject(err));
    });
  }
}
