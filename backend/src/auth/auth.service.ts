import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmployeesService } from '../employees/employees.service.js';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { SignUpDto } from './dtos/signup.dto.js';
import { CreateEmployeeDto } from '../employees/dtos/create-employee.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(inUsername: string, inPassword: string): Promise<{access_token: string}> {
    const employee = await this.employeesService.findOne(inUsername);

    if (!employee) {
      throw new UnauthorizedException("User not found");
    }

    // Implement a more secure password check
    const res = await compare(inPassword, employee.password);
    if (!res) {
      throw new UnauthorizedException("Invalid password");
    }

    // Generate a JWT and return it here
    // instead of the user object
    const payload = { username: employee.username, sub: employee.id, role: employee.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // Signup
  async signUp(signUpDto: SignUpDto): Promise<boolean> {
    const inEmployee = new CreateEmployeeDto();
    inEmployee.username = signUpDto.username;
    inEmployee.password = signUpDto.password;
    inEmployee.role = 'guest';
    return this.employeesService.create(inEmployee);
  }
}