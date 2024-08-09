import { Module } from '@nestjs/common';
import { DatabasesService } from './databases.service.js';
import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { KnexOptions } from './interfaces/knex-options.interface.js';
import { DATABASE_CONFIG_TOKEN } from './constants.js';

@Module({
  providers: [DatabasesService],
  exports: [DatabasesService],
})
export class DatabasesModule extends createConfigurableDynamicRootModule<
  DatabasesModule,
  KnexOptions
>(DATABASE_CONFIG_TOKEN){
  static deferred = () => DatabasesModule.externallyConfigured(DatabasesModule, 0);
}
