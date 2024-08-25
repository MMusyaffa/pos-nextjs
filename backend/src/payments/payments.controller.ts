import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { SavePaymentDto } from './dtos/save-payment.dto.js';
import { FinishPaymentDto } from './dtos/finish-payment.dto.js';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @Roles(['cashier'])
  getTemplatePayment() {
    return this.paymentsService.getTemplatePayment();
  }

  @Get(':payment_id')
  @UseGuards(AuthGuard)
  @Roles(['cashier'])
  getByEmployeeIdAndBuyerId(@Request() req) {
    return this.paymentsService.getByEmployeeIdAndBuyerId(req.params.payment_id);
  }

  @Post('save')
  @UseGuards(AuthGuard)
  @Roles(['cashier'])
  save(@Request() req, @Body() savePaymentDto: SavePaymentDto) {
    return this.paymentsService.save(req.employee.sub, savePaymentDto);
  }

  @Post('finish')
  @UseGuards(AuthGuard)
  @Roles(['cashier'])
  finish(@Request() req, @Body() finishPaymentDto: FinishPaymentDto) {
    return this.paymentsService.finish(req.employee.sub, finishPaymentDto);
  }
}
