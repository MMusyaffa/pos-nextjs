import { IsNotEmpty } from "class-validator";

export class SavePaymentDto {

  @IsNotEmpty()
  buyer_id: string;

  @IsNotEmpty()
  cash: number;

  @IsNotEmpty()
  payment_type: string;
}