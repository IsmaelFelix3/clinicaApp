import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { BuildingLogComponent } from './building-log/building-log.component';
import { AccessLogRoutingModule } from './access-log-routing.module';
import { AddBuildingLogComponent } from './add-building-log/add-building-log.component';
import { EditBuildingLogComponent } from './edit-building-log/edit-building-log.component';

@NgModule({
  declarations: [
    BuildingLogComponent,
    AddBuildingLogComponent,
    EditBuildingLogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    AccessLogRoutingModule
  ]
})
export class AccessLogModule { }
