import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "./constants.js";
import { Reflector } from "@nestjs/core";
import { Roles } from "./roles.decorator.js";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token){
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['employee'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    if (!this.matchRoles(roles, request['employee'])) {
      throw new ForbiddenException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private matchRoles(roles: string[], employee: any): boolean {
    return roles.includes(employee.role);
  }

}