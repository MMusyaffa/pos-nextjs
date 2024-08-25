import { IsNotEmpty } from "class-validator";

export class UpdatePurchaseDto {

  @IsNotEmpty()
  readonly product_id: string;

  @IsNotEmpty()
  readonly quantity: number;
}