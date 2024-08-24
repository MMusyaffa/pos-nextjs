import { IsNotEmpty } from "class-validator";

export class UpdateBuyerDto {
  name: string;

  @IsNotEmpty()
  order_type: string;
}