import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../patients.service';
import { Paciente, PacienteShort, Pacientes } from 'app/interfaces/Paciente.interface';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.scss']
})
export class MedicalRecordsComponent implements OnInit {

  patients: Paciente[] = [];

  option:any;

  constructor(public pacienteService: PatientsService){

  }

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {
    this.pacienteService.getAllPatients().subscribe( data => {
      
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );

    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
