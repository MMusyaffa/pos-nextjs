import { IsNotEmpty } from "class-validator";

export class CreateProductDto {

  @IsNotEmpty()
  readonly name: string;

  readonly description: string;

  @IsNotEmpty()
  readonly price: number;

  readonly category_id: string;
  
  readonly image_url: string;
  
  readonly upload_id: string;
}