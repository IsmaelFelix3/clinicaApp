import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { SharedModule } from "@shared";
import { BuildingLogReportComponent } from './reports/building-log-report/building-log-report.component';

@NgModule({
  declarations: [
    BuildingLogReportComponent
  ],
  imports: [CommonModule, AdminRoutingModule,SharedModule],
})
export class AdminModule {}
