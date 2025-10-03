import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { SharedModule } from "@shared";
import { BuildingLogReportComponent } from './reports/building-log-report/building-log-report.component';
import { ChartsModule } from "app/charts/charts.module";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgChartsModule } from "ng2-charts";

@NgModule({
  declarations: [
    BuildingLogReportComponent
  ],
  imports: [CommonModule, AdminRoutingModule,SharedModule,ChartsModule,NgChartsModule],
})
export class AdminModule {}
