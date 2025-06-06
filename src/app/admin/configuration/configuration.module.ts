import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsCatalogComponent } from './brands-catalog/brands-catalog.component';
import { CategoriesCatalogComponent } from './categories-catalog/categories-catalog.component';
import { ItemsClasificationCatalogComponent } from './items-clasification-catalog/items-clasification-catalog.component';
import { LabsCatalogComponent } from './labs-catalog/labs-catalog.component';
import { MetricUnitCatalogComponent } from './metric-unit-catalog/metric-unit-catalog.component';
import { SuppliersCatalogComponent } from './suppliers-catalog/suppliers-catalog.component';
import { TaxesRateCatalogComponent } from './taxes-rate-catalog/taxes-rate-catalog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ProcedureDetailsComponent } from './procedure-details/procedure-details.component';


@NgModule({
  declarations: [
    BrandsCatalogComponent,
    CategoriesCatalogComponent,
    ItemsClasificationCatalogComponent,
    LabsCatalogComponent,
    MetricUnitCatalogComponent,
    SuppliersCatalogComponent,
    TaxesRateCatalogComponent,
    ProcedureDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    ConfigurationRoutingModule
  ]
})
export class ConfigurationModule { }
