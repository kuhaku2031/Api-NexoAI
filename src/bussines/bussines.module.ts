import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { SalesModule } from './sale/sales/sales.module';
import { PaymentModule } from './payment/payment.module';
import { PosModule } from './pos/pos.module';
import { CustomersModule } from './customers/customers.module';

@Module({


    imports: [InventoryModule, SalesModule, PaymentModule, PosModule, CustomersModule],
    exports: [InventoryModule, SalesModule, PaymentModule, PosModule, CustomersModule],
    controllers: [],
    providers: [],

})
export class BussinesModule {}
