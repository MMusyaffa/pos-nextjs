import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabasesService } from '../databases/databases.service.js';
import { ResponseSuccess } from 'src/transform/transform.interceptor.js';
import { Buyer } from './interfaces/buyer.interface.js';
import { UpdateBuyerDto } from './dtos/update-buyer.dto.js';

@Injectable()
export class BuyersService {
  constructor(
    private readonly databaseService: DatabasesService,
  ) {}

  async getOrCreateBuyer(employee_id: string): Promise<ResponseSuccess<any>> {
    // if buyer exists, return buyer
    if (process.env.IS_USE_MOCK === "true"){
      // mock data
      return { message: "Not Implemented" }
    } else {
      // database data
      const buyer = await this.databaseService.getKnex().select('id').from('buyers').where({employee_id, status: "waiting"}).first();
      if (buyer){
        return {
          message: 'Buyer found',
          data: {buyer_id: buyer.id},
        };
      }
    }

    const newBuyer: Buyer = {
      id: `BYR-${new Date().getTime()}`,
      employee_id,
      name: 'buyer',
      created_at: new Date(),
      order_type: '',
      status: 'waiting',
    };

    if (process.env.IS_USE_MOCK === "true"){
      // mock data
    } else {
      // if buyer does not exist, create buyer
      await this.databaseService.getKnex().insert(newBuyer).into('buyers');
      return {
        message: 'Buyer created',
        data: {id: newBuyer.id},
      };
    } 
  }

  // move to transaction
  async update(employee_id: string, updateBuyerDto: UpdateBuyerDto): Promise<ResponseSuccess<any>> {
    if (process.env.IS_USE_MOCK === "true"){
      // mock data
      return { message: "Not Implemented" }
    } else {
      try {
        // database data
        await this.databaseService.getKnex().transaction(async (trx) => {
          // get buyer
          const buyer = await trx('buyers').select('id').where({employee_id, status: "waiting"}).first();
          // handle error if buyer not found
          if (!buyer){
            throw new BadRequestException("Buyer not found");
          }

          const updateBuyer = {
            name: updateBuyerDto.name || buyer.name,
            order_type: updateBuyerDto.order_type,
            status: "done",
          };
          // update buyer
          await trx('buyers').where({id: buyer.id}).update(updateBuyer);
        });
      } catch (error) {
        if (error instanceof BadRequestException){
          throw error;
        }
        throw new InternalServerErrorException('Failed to update buyer');
      }

      return {
        message: 'Buyer updated',
      };
    }
  }
}
