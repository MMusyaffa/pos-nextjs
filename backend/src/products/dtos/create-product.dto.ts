import { IsNotEmpty } from "class-validator";

export class CreateProductDto {

  @IsNotEmpty()
  readonly title: string;

  readonly description: string;

  @IsNotEmpty()
  readonly price: number;
  
  readonly image_url: string;

  @IsNotEmpty()
  readonly last_updated_by: string;
}