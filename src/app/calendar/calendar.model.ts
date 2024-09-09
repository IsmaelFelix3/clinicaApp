import { formatDate } from '@angular/common';
export class Calendar {
  idBooking: number;
  doctor: number;
  patient: number;
  operatingRoom: number;
  startDate: Date;
  endDate: Date;
  procedure: number;
  status: string;
  details: string;

  constructor(calendar: Calendar) {
    {
      this.idBooking = calendar.idBooking || 0;
      this.procedure = calendar.procedure || 1;
      this.patient = calendar.patient || 0;
      this.doctor = calendar.doctor || 0;
      this.operatingRoom = calendar.operatingRoom || 0;
      this.startDate = new Date();
      this.endDate = new Date();
      this.status = calendar.status || 'Procedimiento Agendado';
      this.details = calendar.details || '';
    }
  }
}
