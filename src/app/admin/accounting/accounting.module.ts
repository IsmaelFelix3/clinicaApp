import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { BanksCatalogComponent } from './banks-catalog/banks-catalog.component';
import { PaymentMethodsCatalogComponent } from './payment-methods-catalog/payment-methods-catalog.component';
import { CloseProcedureComponent } from './close-procedure/close-procedure.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { CloseFormComponent } from './close-procedure/close-form/close-form.component';
import { BalanceComponent } from './balance/balance.component';
import { ChartsModule } from 'app/charts/charts.module';



@NgModule({
  declarations: [
    BanksCatalogComponent,
    PaymentMethodsCatalogComponent,
    CloseProcedureComponent,
    CloseFormComponent,
    BalanceComponent,
  ],
  imports: [
    CommonModule,
    AccountingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    ChartsModule
  ]
})
export class AccountingModule { }
