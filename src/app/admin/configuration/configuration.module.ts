import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsCatalogComponent } from './brands-catalog/brands-catalog.component';
import { CategoriesCatalogComponent } from './categories-catalog/categories-catalog.component';
import { ItemsClasificationCatalogComponent } from './items-clasification-catalog/items-clasification-catalog.component';
import { LabsCatalogComponent } from './labs-catalog/labs-catalog.component';
import { MetricUnitCatalogComponent } from './metric-unit-catalog/metric-unit-catalog.component';
import { SuppliersCatalogComponent } from './suppliers-catalog/suppliers-catalog.component';
import { TaxesRateCatalogComponent } from './taxes-rate-catalog/taxes-rate-catalog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ProcedureDetailsComponent } from './procedure-details/procedure-details.component';
import { EditProcedureDetailsComponent } from './procedure-details/edit-procedure-details/edit-procedure-details.component';
import { AddProcedureDetailsComponent } from './procedure-details/add-procedure-details/add-procedure-details.component';
import { SpecialtiesCatalogComponent } from './specialties-catalog/specialties-catalog.component';
import { MatIconModule } from '@angular/material/icon';
import { EditSpecialtyComponent } from './specialties-catalog/edit-specialty/edit-specialty.component';
import { AddSpecialtyComponent } from './specialties-catalog/add-specialty/add-specialty.component';


@NgModule({
  declarations: [
    BrandsCatalogComponent,
    CategoriesCatalogComponent,
    ItemsClasificationCatalogComponent,
    LabsCatalogComponent,
    MetricUnitCatalogComponent,
    SuppliersCatalogComponent,
    TaxesRateCatalogComponent,
    ProcedureDetailsComponent,
    EditProcedureDetailsComponent,
    AddProcedureDetailsComponent,
    SpecialtiesCatalogComponent,
    EditSpecialtyComponent,
    AddSpecialtyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    ConfigurationRoutingModule,
    MaterialModule,SharedModule
  ],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA
]
})
export class ConfigurationModule { }
