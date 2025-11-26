import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'app/doctor/dashboard/dashboard.component';
import { BuildingLogReportComponent } from './building-log-report/building-log-report.component';
import { AcumulativeProceduresReportComponent } from './acumulative-procedures-report/acumulative-procedures-report.component';

const routes: Routes = [
  {
    path: "buildingLogReport",
    component: BuildingLogReportComponent
  },
  {
    path: "acumulativeProceduresReport",
    component: AcumulativeProceduresReportComponent
  },
  { path: "**", component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
