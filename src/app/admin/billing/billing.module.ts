import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingRoutingModule } from './billing-routing.module';
import { BillListComponent } from './bill-list/bill-list.component';
import { AddBillComponent } from './add-bill/add-bill.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDialogComponent } from './bill-list/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './bill-list/dialog/delete/delete.component';
import { BillListService } from './bill-list/bill-list.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    BillListComponent,
    AddBillComponent,
    InvoiceComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [BillListService],
})
export class BillingModule {}
