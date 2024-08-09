import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PurchasesService } from './purchases.service.js';
import { CreatePurchaseDto, CreatePurchaseDtos } from './dtos/create-purchase.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { Roles } from '../auth/roles.decorator.js';

@Controller('purchases')
export class PurchasesController {
  constructor(
    private readonly purchasesService: PurchasesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(['cashier'])
  create(@Body() createPurhcaseDtos: CreatePurchaseDtos) {
    // todo: create a buyer
    let buyer_id = `buyer-${Date.now()}`;

    // create a purchases
    let cashier_id = ``;
    this.purchasesService.create(createPurhcaseDtos);

    // create a payment
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  findAll() {
    return this.purchasesService.findAll();
  }
}
