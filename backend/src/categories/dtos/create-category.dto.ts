import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  image_url: string;

  upload_id: string;
}