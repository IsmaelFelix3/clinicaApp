import { Component, ViewChild, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Calendar } from './calendar.model';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { CalendarService } from './calendar.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { INITIAL_EVENTS } from './events-util';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { Direction } from '@angular/cdk/bidi';
import { CliqProceduresService } from '../services/cliq-procedures.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  @ViewChild('calendar', { static: false }) calendarComponent!: FullCalendarComponent
  calendar: Calendar | null;
  public addCusForm: FormGroup;
  dialogTitle: string;
  filterOptions = 'All';
  calendarData!: Calendar;
  filterItems: string[] = [
    'procedimientos',
    'mantenimiento',
    'consultas',
    'laboratorios'
  ];

  calendarEvents?: EventInput[];
  tempEvents?: EventInput[];

  public filters: Array<{ name: string; value: string; checked: boolean }> = [
    { name: 'procedimientos', value: 'Procedimientos', checked: true },
    { name: 'mantenimiento', value: 'Mantenimientos', checked: true },
    { name: 'consultas', value: 'Consultas', checked: true },
    { name: 'laboratorios', value: 'Laboratorios', checked: true }
  ];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public calendarService: CalendarService,
    private snackBar: MatSnackBar,
    private cliqProceduresService: CliqProceduresService
  ) {
    super();
    this.dialogTitle = 'Agendar Evento';
    const blankObject = {} as Calendar;
    this.calendar = new Calendar(blankObject);
    this.addCusForm = this.createCalendarForm(this.calendar);
  }

  public ngOnInit(): void {
    this.createCalendar();
  }

  createCalendar(){
    this.cliqProceduresService.getProceduresMonth().subscribe( (Procedures: any) => {
      this.calendarEvents = Procedures;
      this.tempEvents = this.calendarEvents;
      this.calendarOptions!.events = this.calendarEvents;
    });
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    buttonText: {
      today: 'Actual',
      week: 'Semana',
      month: 'Mes',
      list: 'Lista',
      day: 'Dia'

    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventStartEditable: false,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    locale: esLocale
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDateSelect(selectInfo: DateSelectArg) {
    console.log(selectInfo)
    if(this.calendar){
      this.calendar.startDate =  selectInfo.start;
      this.calendar.endDate =  selectInfo.start;
    }
    this.addNewEvent();
  }

  addNewEvent() {
    console.log('entroooooo')
    console.log(this.calendar)
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: this.calendar,
        action: 'add',
      },
      direction: tempDirection,
      width: '50rem',
      height: '64%'
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        // console.log('click')
        // this.calendarData = this.calendarService.getDialogData();
        // console.log('entro')
        // console.log(this.calendarData);
        // this.calendarEvents = this.calendarEvents?.concat({
        //   // add new event data. must create new array
        //   idBooking: this.calendarData.idBooking,
        //   doctor: this.calendarData.doctor,
        //   patient: this.calendarData.patient,
        //   operatingRoom: this.calendarData.operatingRoom,
        //   procedure: this.calendarData.procedure,
        //   start: this.calendarData.startDate,
        //   end: this.calendarData.endDate,
        //   // className: this.getClassNameValue(this.calendarData.category),
        //   // groupId: this.calendarData.category,
        //   status: this.calendarData.status,
        // });
        // console.log(this.calendarEvents)
        // this.calendarOptions.events = this.calendarEvents;

        this.createCalendar();

        this.addCusForm.reset();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  changeCategory(event: MatCheckboxChange, filter: { name: string }) {
    if (event.checked) {
      this.filterItems.push(filter.name);
    } else {
      this.filterItems.splice(this.filterItems.indexOf(filter.name), 1);
    }
    this.filterEvent(this.filterItems);
  }

  filterEvent(element: string[]) {
    const list = this.calendarEvents?.filter((x) =>
      element.map((y?: string) => y).includes(x.groupId)
    );

    this.calendarOptions.events = list;
  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo, 'click info')
    this.eventClick(clickInfo);
  }

  eventClick(row: EventClickArg) {
    console.log(row.event)
    let calendarData = {
      idBooking: row.event.extendedProps['idBooking'],
      doctorId: 0,
      patientId: 0,
      operatingRoomId: 0,
      procedureId: 0,
      doctorName: '',
      patientName: '',
      operatingRoomName: '',
      procedureName: '',
      startDate: new Date(),
      endDate: new Date(),
      details: '',
      status: ''
      // category: row.event.groupId,
      // details: row.event.extendedProps['details'],
    };
    const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
    this.cliqProceduresService.getProcedure(calendarData.idBooking).subscribe( procedure => {
      const date1 = new Date(new Date(procedure.procedimiento.fecha_procedimiento_inicio).getTime() + userTimezoneOffset);
      const date2 = new Date(new Date(procedure.procedimiento.fecha_procedimiento_fin).getTime() + userTimezoneOffset);
      calendarData.doctorId = procedure.procedimiento['Medico.id_medico'];
      calendarData.patientId = procedure.procedimiento['Paciente.id_paciente'],
      calendarData.operatingRoomId = procedure.procedimiento['Quirofano.id_quirofano'],
      calendarData.procedureId = procedure.procedimiento['Catalogo_Procedimiento.id_procedimiento'],
      calendarData.doctorName = procedure.procedimiento['Medico.nombre'] +  ' ' + procedure.procedimiento['Medico.apellidos'],
      calendarData.patientName = procedure.procedimiento['Paciente.nombre'] +  ' ' + procedure.procedimiento['Paciente.apellidos'],
      calendarData.procedureName = procedure.procedimiento['Catalogo_Procedimiento.nombre_procedimiento'],
      calendarData.operatingRoomName = procedure.procedimiento['Quirofano.nombre_quirofano'],
      calendarData.startDate = date1,
      calendarData.endDate = date2,
      calendarData.details = procedure.procedimiento.detalles,
      calendarData.status = procedure.procedimiento.estatus;

      console.log(calendarData)

      let tempDirection: Direction;
      if (localStorage.getItem('isRtl') === 'true') {
        tempDirection = 'rtl';
      } else {
        tempDirection = 'ltr';
      }
      const dialogRef = this.dialog.open(FormDialogComponent, {
        data: {
          calendar: calendarData,
          action: 'edit',
        },
        direction: tempDirection,
      });

      this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
        if (result === 'submit') {
          // this.calendarData = this.calendarService.getDialogData();
          // this.calendarEvents?.forEach((element, index) => {
          //   if (this.calendarData.id === element.id) {
          //     this.editEvent(index, this.calendarData);
          //   }
          // }, this);
          this.showNotification(
            'black',
            'Edit Record Successfully...!!!',
            'bottom',
            'center'
          );
          this.createCalendar();
          this.addCusForm.reset();
        } else if (result === 'delete') {
          /*this.calendarData = this.calendarService.getDialogData();
          this.calendarEvents?.forEach((element) => {
            if (this.calendarData.id === element.id) {
              row.event.remove();
            }
          }, this);*/
          this.createCalendar();
          this.showNotification(
            'snackbar-danger',
            'Delete Record Successfully...!!!',
            'bottom',
            'center'
          );
        }
      });

    });
    

   
  }

  editEvent(eventIndex: number, calendarData: Calendar) {
    console.log('Editar')
    console.log(eventIndex)
    console.log(calendarData)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // const calendarEvents = this.calendarEvents!.slice();
    // const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
    // singleEvent.id = calendarData.id;
    // singleEvent.patient = calendarData.title;
    // singleEvent.start = calendarData.startDate;
    // singleEvent.end = calendarData.endDate;
    // singleEvent.className = this.getClassNameValue(calendarData.category);
    // singleEvent.groupId = calendarData.category;
    // singleEvent['details'] = calendarData.details;
    // calendarEvents[eventIndex] = singleEvent;
    // this.calendarEvents = calendarEvents; // reassign the array

    // this.calendarOptions.events = calendarEvents;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleEvents(events: EventApi[]) {
    // this.currentEvents = events;
  }

  createCalendarForm(calendar: Calendar): FormGroup {
    return this.fb.group({
      id: [calendar.idBooking],
      patient: [calendar.patient, Validators.required,],
      procedure: [calendar.patient, Validators.required,],
      doctor: [calendar.doctor, Validators.required],
      operatingRoom: [calendar.operatingRoom, Validators.required],
      startDate: [calendar.startDate, [Validators.required]],
      endDate: [calendar.endDate, [Validators.required]],
      status: [calendar.status,[Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],],
    });
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getClassNameValue(category: string) {
    let className;

    if (category === 'work') className = 'fc-event-success';
    else if (category === 'personal') className = 'fc-event-warning';
    else if (category === 'important') className = 'fc-event-primary';
    else if (category === 'travel') className = 'fc-event-danger';
    else if (category === 'friends') className = 'fc-event-info';

    return className;
  }
}
