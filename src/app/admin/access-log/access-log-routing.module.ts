import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingLogComponent } from './building-log/building-log.component';
import { AddBuildingLogComponent } from './add-building-log/add-building-log.component';

const routes: Routes = [
  {
    path: "buildingLog",
    component: BuildingLogComponent
  },
   {
    path: "addBuildingLog",
    component: AddBuildingLogComponent
  },
  { path: "**", component: BuildingLogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessLogRoutingModule { }
