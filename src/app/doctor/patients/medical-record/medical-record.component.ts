import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentsService } from 'app/doctor/appointments/appointments.service';
import { PatientsService } from 'app/doctor/patients.service';
import { Expediente } from 'app/interfaces/Expediente.interface';
import { Paciente, PacienteShort } from 'app/interfaces/Paciente.interface';

export interface DialogData {
  id: number;
  action: string;
  details: PacienteShort;
}

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.scss']
})
export class MedicalRecordComponent implements OnInit {

  patientDetail!: Paciente | PacienteShort;

  medicalRecordForm: FormGroup = this.fb.group({
    // General
    idExpediente: [],
    idPaciente: [],
    fechaCreacionExpediente: [],
    edadPaciente: [],
    alergias: [],
    // Personales Patologicos 
    enfermedadesInfantiles: [],
    secuelas: [],
    hospitalizacion: [],
    quirurgicos: [],
    otrasEnfermedades: [],
    // Personales no Patologicos
    fumador: [],
    alcohol: [],
    drogas: [],
    tipoSanguineo: [],
    diabetes: [],  
    otros: [],
    inmunizacion: [], 
    // Andrologicos
    circuncision: [],
    criptorquidia: [],
    vsa: [],
    numeroParejas: [],
    ets: [],
    transtornoEreccion: [],
    andropausia: [],
    // Gineco Obstetricos
    menarca: [],
    cicloMenstrual: [],
    vsaGO: [],
    numeroParejasGO: [],
    numeroEmbarazos: [],
    numeroPartos: [],
    abortos: [],
    cesareas: [],
    metodoAnticonceptivo: [],
    fechaUltimaMenstruacion: [],
    etsGO: [],
    menopausia: [],
    papanicolau: [],
    lactanciaMaterna: [],
    // Heredo Familiar
    diabetesHF: [],
    hipertensionArterial: [],
    cancer: [],
    tipoCancer: [],
    familiarCancer: [],
    cardiopatas: [],
    familiarCardiopatas: [],
    nefropatas: [],
    familiarNefropatas: [],
    descripcionMalformaciones: [],
   });

  constructor(public patientService: PatientsService, 
              public appoinmentService: AppointmentsService,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: DialogData){}

  ngOnInit(): void {
    console.log(this.data)
    if(this.data !== null){
      this.patientDetail = this.data.details; 
      let idExpediente = this.patientDetail.idExpediente;
      this.patientService.getMedicalRecordById(idExpediente).subscribe( (data: Expediente) => {
          console.log(data);
          // General
          this.medicalRecordForm.get('idExpediente')?.setValue(data.expediente.id_expediente);
          this.medicalRecordForm.get('idPaciente')?.setValue(data.expediente.id_paciente);
          this.medicalRecordForm.get('fechaCreacionExpediente')?.setValue(data.expediente.fecha_creacion_expediente);
          this.medicalRecordForm.get('edadPaciente')?.setValue( this.calculate_age(new Date(this.patientDetail.fecha_nacimiento)));
          this.medicalRecordForm.get('alergias')?.setValue(data.expediente.alergias);
          // Personales Patologicos 
          this.medicalRecordForm.get('enfermedadesInfantiles')?.setValue(data.expediente.Antecedentes_Personales_Patologico.enfermedades_infantiles);
          this.medicalRecordForm.get('secuelas')?.setValue(data.expediente.Antecedentes_Personales_Patologico.secuelas);
          this.medicalRecordForm.get('hospitalizacion')?.setValue(data.expediente.Antecedentes_Personales_Patologico.hospitalizaciones.descripcion_hospitalizacion);
          this.medicalRecordForm.get('quirurgicos')?.setValue(data.expediente.Antecedentes_Personales_Patologico.antecedentes_quirurgicos.descripcion_antecedente_quirurgico);
          this.medicalRecordForm.get('otrasEnfermedades')?.setValue(data.expediente.Antecedentes_Personales_Patologico.otras_enfermedades.descripcion_otras_enfermedades);
          // Personales no Patologicos
          this.medicalRecordForm.get('fumador')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.fumador);
          this.medicalRecordForm.get('alcohol')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.alcohol);
          this.medicalRecordForm.get('drogas')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.drogas);
          this.medicalRecordForm.get('tipoSanguineo')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.tipo_sanguineo);
          this.medicalRecordForm.get('diabetes')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.diabetes);
          this.medicalRecordForm.get('otros')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.otros);
          this.medicalRecordForm.get('inmunizacion')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.Inmunizaciones[0].descripcion_inmunizacion);
          // Andrologicos
          this.medicalRecordForm.get('circuncision')?.setValue(data.expediente.Antecedentes_Andrologico.circuncision);
          this.medicalRecordForm.get('criptorquidia')?.setValue(data.expediente.Antecedentes_Andrologico.criptorquidia);
          this.medicalRecordForm.get('vsa')?.setValue(data.expediente.Antecedentes_Andrologico.vsa);
          this.medicalRecordForm.get('numeroParejas')?.setValue(data.expediente.Antecedentes_Andrologico.numero_parejas);
          this.medicalRecordForm.get('ets')?.setValue(data.expediente.Antecedentes_Andrologico.ets);
          this.medicalRecordForm.get('transtornoEreccion')?.setValue(data.expediente.Antecedentes_Andrologico.transtorno_ereccion);
          this.medicalRecordForm.get('andropausia')?.setValue(data.expediente.Antecedentes_Andrologico.andropausia);
          // Gineco Obstetricos
          this.medicalRecordForm.get('menarca')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.menarca);
          this.medicalRecordForm.get('cicloMenstrual')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.ciclo_menstrual);
          this.medicalRecordForm.get('vsaGO')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.vsa);
          this.medicalRecordForm.get('numeroParejasGO')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.numero_parejas);
          this.medicalRecordForm.get('numeroEmbarazos')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.numero_embarazos);
          this.medicalRecordForm.get('numeroPartos')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.numero_partos);
          this.medicalRecordForm.get('abortos')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.abortos);
          this.medicalRecordForm.get('cesareas')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.cesareas);
          this.medicalRecordForm.get('metodoAnticonceptivo')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.metodo_anticonceptivo);
          this.medicalRecordForm.get('fechaUltimaMenstruacion')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.fecha_ultima_menstruacion);
          this.medicalRecordForm.get('etsGO')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.ets);
          this.medicalRecordForm.get('menopausia')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.menopausia);
          this.medicalRecordForm.get('papanicolau')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.papanicolau);
          this.medicalRecordForm.get('lactanciaMaterna')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.lactancia_materna);
          // Heredo Familiar
          this.medicalRecordForm.get('diabetesHF')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.diabetes);
          this.medicalRecordForm.get('hipertensionArterial')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.hipertension_arterial);
          this.medicalRecordForm.get('cancer')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.cancer);
          this.medicalRecordForm.get('tipoCancer')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.tipo_cancer);
          this.medicalRecordForm.get('familiarCancer')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.familiar_cancer);
          this.medicalRecordForm.get('cardiopatas')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.cardiopatas);
          this.medicalRecordForm.get('familiarCardiopatas')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.familiar_cancer);
          this.medicalRecordForm.get('nefropatas')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.nefropatas);
          this.medicalRecordForm.get('familiarNefropatas')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.familiar_nefropatas);
          this.medicalRecordForm.get('descripcionMalformaciones')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.descripcion_malformaciones);
        });
      return;
    }
      this.patientDetail = this.appoinmentService.currentAppointment.Paciente; 
      console.log(this.patientDetail)
      let idExpediente = this.appoinmentService.currentAppointment.Paciente.id_expediente;
      this.patientService.getMedicalRecordById(idExpediente).subscribe( (data: Expediente) => {
          console.log(data);
          // General
          this.medicalRecordForm.get('idExpediente')?.setValue(data.expediente.id_expediente);
          this.medicalRecordForm.get('idPaciente')?.setValue(data.expediente.id_paciente);
          this.medicalRecordForm.get('fechaCreacionExpediente')?.setValue(data.expediente.fecha_creacion_expediente);
          this.medicalRecordForm.get('edadPaciente')?.setValue( this.calculate_age(new Date(this.patientDetail.fecha_nacimiento)));
          this.medicalRecordForm.get('alergias')?.setValue(data.expediente.alergias);
          // Personales Patologicos 
          this.medicalRecordForm.get('enfermedadesInfantiles')?.setValue(data.expediente.Antecedentes_Personales_Patologico.enfermedades_infantiles);
          this.medicalRecordForm.get('secuelas')?.setValue(data.expediente.Antecedentes_Personales_Patologico.secuelas);
          this.medicalRecordForm.get('hospitalizacion')?.setValue(data.expediente.Antecedentes_Personales_Patologico.hospitalizaciones.descripcion_hospitalizacion);
          this.medicalRecordForm.get('quirurgicos')?.setValue(data.expediente.Antecedentes_Personales_Patologico.antecedentes_quirurgicos.descripcion_antecedente_quirurgico);
          this.medicalRecordForm.get('otrasEnfermedades')?.setValue(data.expediente.Antecedentes_Personales_Patologico.otras_enfermedades.descripcion_otras_enfermedades);
          // Personales no Patologicos
          this.medicalRecordForm.get('fumador')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.fumador);
          this.medicalRecordForm.get('alcohol')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.alcohol);
          this.medicalRecordForm.get('drogas')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.drogas);
          this.medicalRecordForm.get('tipoSanguineo')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.tipo_sanguineo);
          this.medicalRecordForm.get('diabetes')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.diabetes);
          this.medicalRecordForm.get('otros')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.otros);
          this.medicalRecordForm.get('inmunizacion')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.Inmunizaciones[0].descripcion_inmunizacion);
          // Andrologicos
          this.medicalRecordForm.get('circuncision')?.setValue(data.expediente.Antecedentes_Andrologico.circuncision);
          this.medicalRecordForm.get('criptorquidia')?.setValue(data.expediente.Antecedentes_Andrologico.criptorquidia);
          this.medicalRecordForm.get('vsa')?.setValue(data.expediente.Antecedentes_Andrologico.vsa);
          this.medicalRecordForm.get('numeroParejas')?.setValue(data.expediente.Antecedentes_Andrologico.numero_parejas);
          this.medicalRecordForm.get('ets')?.setValue(data.expediente.Antecedentes_Andrologico.ets);
          this.medicalRecordForm.get('transtornoEreccion')?.setValue(data.expediente.Antecedentes_Andrologico.transtorno_ereccion);
          this.medicalRecordForm.get('andropausia')?.setValue(data.expediente.Antecedentes_Andrologico.andropausia);
          // Gineco Obstetricos
          this.medicalRecordForm.get('menarca')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.menarca);
          this.medicalRecordForm.get('cicloMenstrual')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.ciclo_menstrual);
          this.medicalRecordForm.get('vsaGO')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.vsa);
          this.medicalRecordForm.get('numeroParejasGO')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.numero_parejas);
          this.medicalRecordForm.get('numeroEmbarazos')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.numero_embarazos);
          this.medicalRecordForm.get('numeroPartos')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.numero_partos);
          this.medicalRecordForm.get('abortos')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.abortos);
          this.medicalRecordForm.get('cesareas')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.cesareas);
          this.medicalRecordForm.get('metodoAnticonceptivo')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.metodo_anticonceptivo);
          this.medicalRecordForm.get('fechaUltimaMenstruacion')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.fecha_ultima_menstruacion);
          this.medicalRecordForm.get('etsGO')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.ets);
          this.medicalRecordForm.get('menopausia')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.menopausia);
          this.medicalRecordForm.get('papanicolau')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.papanicolau);
          this.medicalRecordForm.get('lactanciaMaterna')?.setValue(data.expediente.Antecedentes_Gineco_Obstetrico.lactancia_materna);
          // Heredo Familiar
          this.medicalRecordForm.get('diabetesHF')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.diabetes);
          this.medicalRecordForm.get('hipertensionArterial')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.hipertension_arterial);
          this.medicalRecordForm.get('cancer')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.cancer);
          this.medicalRecordForm.get('tipoCancer')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.tipo_cancer);
          this.medicalRecordForm.get('familiarCancer')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.familiar_cancer);
          this.medicalRecordForm.get('cardiopatas')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.cardiopatas);
          this.medicalRecordForm.get('familiarCardiopatas')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.familiar_cancer);
          this.medicalRecordForm.get('nefropatas')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.nefropatas);
          this.medicalRecordForm.get('familiarNefropatas')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.familiar_nefropatas);
          this.medicalRecordForm.get('descripcionMalformaciones')?.setValue(data.expediente.Antecedentes_Heredo_Familiare.descripcion_malformaciones);
        });

  }

  calculate_age(dob: Date) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
}
