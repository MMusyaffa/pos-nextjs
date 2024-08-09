import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class CreatePurchaseDto {

  @IsNotEmpty()
  readonly product_id: string;

  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;
}

export class CreatePurchaseDtos {

  @IsNotEmpty()
  readonly buyer_name: string;

  @IsNotEmpty()
  readonly cashier_id: string;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseDto)
  readonly purchases: CreatePurchaseDto[];
}