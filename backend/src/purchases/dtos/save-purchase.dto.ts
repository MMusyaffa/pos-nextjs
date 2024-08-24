import { IsNotEmpty } from "class-validator";

export class SavePurchaseDto {

  @IsNotEmpty()
  buyer_id: string;
  
  @IsNotEmpty()
  product_id: string;

  @IsNotEmpty()
  quantity: number;
}