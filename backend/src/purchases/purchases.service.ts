import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePurchaseDto, CreatePurchaseDtos } from './dtos/create-purchase.dto.js';
import { Purchase } from './interfaces/purchase.interface.js';
import { DatabasesService } from '../databases/databases.service.js';
import { ResponseSuccess } from 'src/transform/transform.interceptor.js';
import { UpdatePurchaseDto } from './dtos/update-purchase.dto.js';

@Injectable()
export class PurchasesService {
  constructor(
    private readonly databaseService: DatabasesService,
  ) {}

  private readonly purchases: Purchase[] = [];

  async findAll(): Promise<ResponseSuccess<Purchase[]>> {
    if (process.env.IS_USE_MOCK === 'true') {
      // using mock data
      return {
        message: 'Purchases found',
        data: this.purchases,
      };
    } else {
      // using database data
      return {
        message: 'Not implemented',
      }
    }
  }

  async findByBuyerId(employee_id: string, buyer_id: string): Promise<ResponseSuccess<Purchase[]>> {
    if (process.env.IS_USE_MOCK === 'true') {
      // using mock data
      return {
        message: 'Purchases found',
        data: this.purchases.filter(purchase => purchase.buyer_id === buyer_id),
      };
    } else {
      // using database data
      try {
        // check if buyer_id exists
        const purchases = await this.databaseService.getKnex().select('product_id', 'quantity', 'subtotal_each').where({ buyer_id, employee_id }).from('purchases');
        return {
          message: 'Purchases found',
          data: purchases,
        }
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
        throw new InternalServerErrorException(error);
      }
    }
  }

  async update(employee_id: string, buyer_id: string, updatePurchaseDto: UpdatePurchaseDto): Promise<ResponseSuccess<Purchase>> {
    if (process.env.IS_USE_MOCK === 'true') {
      // using mock data
      const purchase = this.purchases.find(purchase => purchase.buyer_id === buyer_id && purchase.product_id === updatePurchaseDto.product_id && purchase.employee_id === employee_id);
      if (!purchase) {
        throw new BadRequestException('Purchase not found');
      }
      purchase.quantity = updatePurchaseDto.quantity;
      return {
        message: 'Purchase updated',
        data: purchase,
      };
    } else {
      // using database data
      return {
        message: 'Not implemented',
      }
    }
  }
}
