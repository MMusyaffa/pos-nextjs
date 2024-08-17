import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BuyersModule } from './buyers/buyers.module.js';
import { ProductsModule } from './products/products.module.js';
import { PurchasesModule } from './purchases/purchases.module.js';
import { UploadsModule } from './uploads/uploads.module.js';
import { EmployeesModule } from './employees/employees.module.js';
import { AuthModule } from './auth/auth.module.js';
import { DatabasesModule } from './databases/databases.module.js';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BuyersModule, 
    ProductsModule, 
    PurchasesModule, 
    UploadsModule, 
    EmployeesModule, 
    AuthModule,
    DatabasesModule.forRoot(DatabasesModule, {
      client: process.env.DB_CLIENT,
        connection: {
          host: process.env.DB_HOST,  
          port: parseInt(process.env.DB_PORT),
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        }
    }),
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
