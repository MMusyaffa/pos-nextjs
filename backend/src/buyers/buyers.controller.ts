import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { BuyersService } from './buyers.service.js';
import { Roles } from '../auth/roles.decorator.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { UpdateBuyerDto } from './dtos/update-buyer.dto.js';

@Controller('buyers')
export class BuyersController {

  constructor(
    private readonly buyersService: BuyersService,
  ) { }

  @Get()
  @UseGuards(AuthGuard)
  @Roles(['cashier'])
  getOrCreateBuyer(@Request() req) {
    return this.buyersService.getOrCreateBuyer(req.employee.sub);
  }

  @Put()
  @UseGuards(AuthGuard)
  @Roles(['cashier'])
  update(@Request() req, @Body() updateBuyerDto: UpdateBuyerDto) {
    return this.buyersService.update(req.employee.sub, updateBuyerDto);
  }
}
