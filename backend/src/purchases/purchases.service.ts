import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto, CreatePurchaseDtos } from './dtos/create-purchase.dto.js';
import { Purchase } from './interfaces/purchase.interface.js';

@Injectable()
export class PurchasesService {

  private readonly purchases: Purchase[] = [];

  create(createPurhcaseDtos: CreatePurchaseDtos) {
    this.purchases.push(...createPurhcaseDtos.purchases.map((purchase: CreatePurchaseDto) => {
      return {
        buyer_id: `buyer-${Date.now()}`,
        cashier_id: createPurhcaseDtos.cashier_id,
        ...purchase,
        total: -1,
        };
    }));
  }

  findAll(): Purchase[] {
    return this.purchases;
  }
}
