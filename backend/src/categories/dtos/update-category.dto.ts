import { IsNotEmpty } from "class-validator";

export class UpdateCategoryDto {
  name: string;

  image_url: string;

  is_archived: boolean;

  upload_id: string;
}