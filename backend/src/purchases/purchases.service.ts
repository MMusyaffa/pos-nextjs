import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePurchaseDto, CreatePurchaseDtos } from './dtos/create-purchase.dto.js';
import { Purchase } from './interfaces/purchase.interface.js';
import { DatabasesService } from '../databases/databases.service.js';
import { ResponseSuccess } from 'src/transform/transform.interceptor.js';
import { UpdatePurchaseDto } from './dtos/update-purchase.dto.js';
import { SavePurchaseDto } from './dtos/save-purchase.dto.js';

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

  async findByBuyerId(employee_id: string, buyer_id: string): Promise<ResponseSuccess<any[]>> {
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
        const purchases: {
          name: string;
          price: number;
          quantity: number;
          subtotal_each: number;
          image_url: string;
          filename: string;
        }[] = await this.databaseService.getKnex()
          .join('products', 'products.id', 'purchases.product_id')
          .leftJoin('uploads', 'uploads.id', 'products.upload_id')
          .select('products.name', 'products.price', 'quantity', 'subtotal_each', 'image_url', 'uploads.filename')
          .where({ buyer_id, employee_id })
          .andWhere('quantity', '>', 0)
          .from('purchases');

        const purchasesMapped: any = purchases.map(purchase => {
          const {image_url, filename, ...purchaseFilter} = purchase;
          return {
            ...purchaseFilter,
            image_url: image_url || `${process.env.BASE_URL}/uploads/${filename}`,
          }
        });
        
        return {
          message: 'Purchases found',
          data: purchasesMapped,
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

  async save(employee_id: string, savePurchaseDto: SavePurchaseDto): Promise<ResponseSuccess<Purchase>> {
    if (process.env.IS_USE_MOCK === "true"){
      // using mock data
      return {
        message: 'Not implemented',
      }
    } else {
      // using database data
      try {
        return await this.databaseService.getKnex().transaction(async (trx) => {

          // check if buyer not from other employee
          const buyer = await trx('buyers').select('id').where({ employee_id }).first();
          if (!buyer) {
            throw new BadRequestException('Buyer not found');
          }

          // check if product_id exists
          const product: {
            price: number;
          } = await trx('products').select('price').where({ id: savePurchaseDto.product_id }).first();
          if (!product) {
            throw new BadRequestException('Product not found');
          }

          // check if purchase exists
          const purchase: {
            quantity: number;
            status: string;
          } = await trx('purchases').select('quantity', 'status').where({
            product_id: savePurchaseDto.product_id,
            buyer_id: savePurchaseDto.buyer_id,
            employee_id,
          }).first();

          if (purchase) {

            if (purchase.status === 'finished') {
              throw new BadRequestException('Purchase already finished');
            }

            // Update purchase
            const addQuantity = savePurchaseDto.quantity + purchase.quantity;
            if (addQuantity < 0) {
              throw new BadRequestException('Quantity must be greater equal than 0');
            }
            const updatedPurchase = {
              quantity: addQuantity,
              subtotal_each: product.price * addQuantity,
            }
            await trx('purchases').update(updatedPurchase).where({
              product_id: savePurchaseDto.product_id,
              buyer_id: savePurchaseDto.buyer_id,
              employee_id,
            });

            return {
              message: 'Updated successfully',
            }
          } else {
            // create purchase
            const purchase: Purchase = {
              buyer_id: savePurchaseDto.buyer_id,
              employee_id,
              product_id: savePurchaseDto.product_id,
              quantity: savePurchaseDto.quantity,
              subtotal_each: product.price * savePurchaseDto.quantity,
              created_at: new Date(),
              status: 'waiting',
            }
            await trx('purchases').insert(purchase);

            return {
              message: 'Saved successfully',
            }
          }
        });
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
        throw new InternalServerErrorException(error);
      }
    }
  }
}
