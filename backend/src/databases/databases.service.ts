import { Inject, Injectable } from '@nestjs/common';
import { KnexOptions } from './interfaces/knex-options.interface.js';
import knex, { Knex } from 'knex';
import { DATABASE_CONFIG_TOKEN as KNEX_CONFIG_TOKEN } from './constants.js';

interface INestKnexService {
  getKnex(): Knex;
}

@Injectable()
export class DatabasesService implements INestKnexService {

  private _knexConnection: Knex;

  constructor(@Inject(KNEX_CONFIG_TOKEN) private readonly options: KnexOptions){ }
  
  getKnex(): Knex {
    if (!this._knexConnection) {
      this._knexConnection = knex(this.options);
    }
    return this._knexConnection;
  }

}
