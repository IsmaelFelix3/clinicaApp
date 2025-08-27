import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanksCatalogComponent } from './banks-catalog/banks-catalog.component';
import { PaymentMethodsCatalogComponent } from './payment-methods-catalog/payment-methods-catalog.component';
import { CloseProcedureComponent } from './close-procedure/close-procedure.component';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { CloseFormComponent } from './close-procedure/close-form/close-form.component';
import { BalanceComponent } from './balance/balance.component';
import { AddBankComponent } from './banks-catalog/add-bank/add-bank.component';
import { EditBankComponent } from './banks-catalog/edit-bank/edit-bank.component';
import { EditPaymentMethodComponent } from './payment-methods-catalog/edit-payment-method/edit-payment-method.component';
import { AddPaymentMethodComponent } from './payment-methods-catalog/add-payment-method/add-payment-method.component';

const routes: Routes = [
  {
    path: "banksCatalog",
    component: BanksCatalogComponent,
  },
  {
    path: "addBank",
    component: AddBankComponent,
  },
  {
    path: "editBank",
    component: EditBankComponent,
  },
  {
    path: "paymentMethodsCatalog",
    component: PaymentMethodsCatalogComponent,
  },
  {
    path: "addPaymentMethod",
    component: AddPaymentMethodComponent,
  },
  {
    path: "editPaymentMethod",
    component: EditPaymentMethodComponent,
  },
  {
    path: "closeProcedure",
    component: CloseProcedureComponent,
  },
  {
    path: "closeForm",
    component: CloseFormComponent,
  },
  {
    path: "balance",
    component: BalanceComponent,
  },
  { path: "**", component: Page404Component },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountingRoutingModule { }
