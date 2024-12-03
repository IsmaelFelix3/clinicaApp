import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { IssuedItemsComponent } from './issued-items/issued-items.component';
import { ItemStockListComponent } from './item-stock-list/item-stock-list.component';
import { EditItemComponent } from './item-stock-list/edit-item/edit-item.component';
import { AddSuppliesComponent } from './item-stock-list/add-supplies/add-supplies.component';
import { ItemStockComponent } from './item-stock/item-stock.component';

const routes: Routes = [
  {
    path: 'item-stock-list',
    component: ItemStockListComponent,
  },
  {
    path: 'issued-items',
    component: IssuedItemsComponent,
  },
  {
    path: 'item-stock',
    component: ItemStockComponent,
  },
  {
    path: 'edit-item',
    component: EditItemComponent
  },
  {
    path: 'add-supplies',
    component: AddSuppliesComponent
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
