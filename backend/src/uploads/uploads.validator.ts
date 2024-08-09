import { FileValidator } from "@nestjs/common";
import { fileTypeFromBuffer } from "file-type";

export class CustomFileTypeValidator extends FileValidator {

  constructor(private readonly inValidationOptions: { fileTypes: string[] }) {
    super(inValidationOptions);
  }

  isValid(file?: any): Promise<boolean> {
    return new Promise<boolean>((resolve, _) => {
      fileTypeFromBuffer(file.buffer)
        .then((fileType) => {
          if (this.inValidationOptions.fileTypes.includes(fileType.mime)) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((_) => {
          resolve(false);
        });
    });
  }

  buildErrorMessage(_: any): string {
    return `File type is not allowed. Allowed file types are: ${this.inValidationOptions.fileTypes.join(', ')}`;
  }
}