import { IsNotEmpty, IsString } from "class-validator";

export class FinishPaymentDto {
    @IsNotEmpty()
    @IsString()
    payment_id: string;

    @IsNotEmpty()
    @IsString()
    buyer_id: string;
}