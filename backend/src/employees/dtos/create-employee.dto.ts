import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateEmployeeDto {

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(['cashier'])
  role: string;
}