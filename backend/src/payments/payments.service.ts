import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabasesService } from '../databases/databases.service.js';
import { SavePaymentDto } from './dtos/save-payment.dto.js';
import { ResponseSuccess } from '../transform/transform.interceptor.js';

@Injectable()
export class PaymentsService {

  constructor(
    private readonly databaseService: DatabasesService,
  ) {}

  // get by employee_id and buyer_id
  async getByEmployeeIdAndBuyerId(payment_id: string): Promise<ResponseSuccess<any>> {
    if (process.env.IS_USE_MOCK === 'true') {
      // using mock data
      return {
        message: 'Not implemented',
      };
    } else {
      // using database data
      try {
        const payment = await this.databaseService.getKnex()
          .select('subtotal', 'service', 'voucher', 'total', 'cash', 'change', 'payment_type', 'status')
          .from('payments')
          .where({ id: payment_id })
          .first();
        
        const service = 0.11;

        return {
          message: 'Payment found',
          data: {
            ...payment,
            service_percennt: service*100,
          },
        };
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
        throw new InternalServerErrorException("Failed to get payment: " + error.message);
      }
    }
      
  }

  // save
  async save(employee_id: string, savePaymentDto: SavePaymentDto): Promise<ResponseSuccess<any>> {
    if (process.env.IS_USE_MOCK === 'true') {
      // using mock data
      return {
        message: 'Not implemented',
      };
    } else {
      // using database data
      try {
        return await this.databaseService.getKnex().transaction(async trx => {

          // check if buyer not from other employee
          const buyer = await trx('buyers').select('id').where({ employee_id }).first();
          if (!buyer) {
            throw new BadRequestException('Buyer not found');
          }

          // get all products
          const products: {
            subtotal_each: number;
          }[] = await trx('purchases').select('subtotal_each').where({ buyer_id: savePaymentDto.buyer_id, employee_id: employee_id });
          const subtotal = products.reduce((acc, product) => acc + product.subtotal_each, 0);

          let total = subtotal;

          const service = 0.11;
          const voucher = 0;
          
          const totalservice = (total * service);
          total += totalservice;

          const totalVoucher = (total * voucher);
          total -= totalVoucher;

          const change = savePaymentDto.cash - total;

          // check if payment already exists
          const payment = await trx('payments').select('id').where({ buyer_id: savePaymentDto.buyer_id, employee_id: employee_id }).first();
          if (payment) {
            // update payment
            await trx('payments').update({
              subtotal,
              service: totalservice,
              voucher,
              total,
              cash: savePaymentDto.cash,
              change,
              payment_type: savePaymentDto.payment_type,
            }).where({ id: payment.id });

            return {
              message: 'Payment updated',
              data: { payment_id: payment.id },
            };
          } else {
            // create payment
            const id = `PYM-${Date.now()}`;
            await trx('payments').insert({
              id,
              buyer_id: savePaymentDto.buyer_id,
              employee_id: employee_id,
              subtotal,
              service,
              voucher,
              total,
              cash: savePaymentDto.cash,
              change,
              created_at: new Date(),
              payment_type: savePaymentDto.payment_type,
              status: 'waiting',
            });

            return {
              message: 'Payment created',
              data: {payment_id: id},
            };
          }
        });
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
        throw new InternalServerErrorException("Failed to save payment: " + error.message);
      }
    }
  }

  // finish
}
