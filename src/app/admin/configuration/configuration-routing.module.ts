import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { BrandsCatalogComponent } from './brands-catalog/brands-catalog.component';
import { CategoriesCatalogComponent } from './categories-catalog/categories-catalog.component';
import { ItemsClasificationCatalogComponent } from './items-clasification-catalog/items-clasification-catalog.component';
import { LabsCatalogComponent } from './labs-catalog/labs-catalog.component';
import { MetricUnitCatalogComponent } from './metric-unit-catalog/metric-unit-catalog.component';
import { SuppliersCatalogComponent } from './suppliers-catalog/suppliers-catalog.component';
import { TaxesRateCatalogComponent } from './taxes-rate-catalog/taxes-rate-catalog.component';
import { ProcedureDetailsComponent } from './procedure-details/procedure-details.component';
import { EditProcedureDetailsComponent } from './procedure-details/edit-procedure-details/edit-procedure-details.component';
import { AddProcedureDetailsComponent } from './procedure-details/add-procedure-details/add-procedure-details.component';

const routes: Routes = [
  {
    path: 'brands',
    component: BrandsCatalogComponent,
  },
  {
    path: 'categories',
    component: CategoriesCatalogComponent,
  },
  {
    path: 'itemsClasification',
    component: ItemsClasificationCatalogComponent,
  },
  {
    path: 'labs',
    component: LabsCatalogComponent,
  },
  {
    path: 'metricUnit',
    component: MetricUnitCatalogComponent,
  },
  {
    path: 'suppliers',
    component: SuppliersCatalogComponent,
  },
  {
    path: 'taxesRate',
    component: TaxesRateCatalogComponent,
  },
  {
    path: 'procedureDetails',
    component: ProcedureDetailsComponent
  },
  {
    path: 'editProcedureDetails',
    component: EditProcedureDetailsComponent
  },
  {
    path: 'addProcedureDetails',
    component: AddProcedureDetailsComponent
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
