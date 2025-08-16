import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanksCatalogComponent } from './banks-catalog/banks-catalog.component';
import { PaymentMethodsCatalogComponent } from './payment-methods-catalog/payment-methods-catalog.component';
import { CloseProcedureComponent } from './close-procedure/close-procedure.component';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { CloseFormComponent } from './close-procedure/close-form/close-form.component';

const routes: Routes = [
  {
    path: "banksCatalog",
    component: BanksCatalogComponent,
  },
  {
    path: "paymentMethodsCatalog",
    component: PaymentMethodsCatalogComponent,
  },
  {
    path: "closeProcedure",
    component: CloseProcedureComponent,
  },
  {
    path: "closeForm",
    component: CloseFormComponent,
  },
  { path: "**", component: Page404Component },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountingRoutingModule { }
