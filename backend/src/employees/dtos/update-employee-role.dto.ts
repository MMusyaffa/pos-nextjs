import { IsEnum, IsNotEmpty } from "class-validator"

export class UpdateEmployeeRoleDto {

  @IsNotEmpty()
  @IsEnum(['admin', 'cashier', 'guest'])
  readonly role: string;

}