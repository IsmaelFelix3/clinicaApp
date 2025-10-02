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
import { EditBankComponent } from './banks-catalog/edit-bank/edit-bank.component';
import { AddBankComponent } from './banks-catalog/add-bank/add-bank.component';
import { AddPaymentMethodComponent } from './payment-methods-catalog/add-payment-method/add-payment-method.component';
import { EditPaymentMethodComponent } from './payment-methods-catalog/edit-payment-method/edit-payment-method.component';

@NgModule({
  declarations: [
    BanksCatalogComponent,
    PaymentMethodsCatalogComponent,
    CloseProcedureComponent,
    CloseFormComponent,
    BalanceComponent,
    EditBankComponent,
    AddBankComponent,
    AddPaymentMethodComponent,
    EditPaymentMethodComponent,
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
