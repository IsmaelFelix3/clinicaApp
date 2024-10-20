import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AppointmentsService } from 'app/doctor/appointments/appointments.service';
import { PatientsService } from 'app/doctor/patients.service';
import { Expediente } from 'app/interfaces/Expediente.interface';
import { Paciente, PacienteShort } from 'app/interfaces/Paciente.interface';
import Swal from 'sweetalert2';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';

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
  isPatientMale: boolean = true;

  medicalRecordForm: FormGroup = this.fb.group({
    // General
    idExpediente: [{value: '',disabled: true}],
    idPaciente: [{value: '',disabled: true}],
    fechaCreacionExpediente: [{value: '',disabled: true}],
    edadPaciente: [{value: '',disabled: true}],
    alergias: [],
    tipoSanguineo: [],
    idAntecedentesHeredoFamiliares: [],
    idAntecedentesPersonalesPatologicos: [],
    idAntecedentesPersonalesNoPatologicos: [],
    idAntecedentesAndrologicos: [],
    idAntecedentesGinecoObstetrico: [],
    genero: [],
    // Personales Patologicos 
    enfermedadesInfantiles: [],
    secuelas: [],
    hospitalizacion: [],
    quirurgicos: [],
    otrasEnfermedades: [],
    idHospitalizacion: [],
    idQuirurgicos: [],
    idOtrasEnfermedades: [],
    // Personales no Patologicos
    fumador: [],
    alcohol: [],
    drogas: [],
    diabetes: [],  
    otros: [],
    inmunizacion: [], 
    idInmunizacion: [],
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
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              public dialog: MatDialog){}

  closeModal(){
    this.dialog.closeAll()
    if(this.data != null){
      this.dialog.open(PatientDetailsComponent, {
        data: {
          details: this.data.details,
          action: 'return'
        },
        width: '40%',
      });
    }
  }

  // 2023-08-31T22:19:31.000Z

  ngOnInit(): void {

   

    if(this.data !== null){
      this.patientDetail = this.data.details; 
      this.isPatientMale = this.patientDetail.genero === 'Masculino' ? true : false ;
      let idExpediente = this.patientDetail.idExpediente;
      this.patientService.getMedicalRecordById(idExpediente).subscribe( (data: Expediente) => {
          // General
          this.medicalRecordForm.get('idExpediente')?.setValue(data.expediente.id_expediente);
          this.medicalRecordForm.get('idPaciente')?.setValue(data.expediente.id_paciente);
          this.medicalRecordForm.get('fechaCreacionExpediente')?.setValue(data.expediente.fecha_creacion_expediente.split('T')[0]);
          this.medicalRecordForm.get('edadPaciente')?.setValue( this.calculate_age(new Date(this.patientDetail.fecha_nacimiento)));
          this.medicalRecordForm.get('alergias')?.setValue(data.expediente.alergias);
          this.medicalRecordForm.get('idAntecedentesAndrologicos')?.setValue(data.expediente.id_antecedentes_andrologicos);
          this.medicalRecordForm.get('idAntecedentesGinecoObstetrico')?.setValue(data.expediente.id_antecedentes_gineco_obstetrico);
          this.medicalRecordForm.get('idAntecedentesPersonalesPatologicos')?.setValue(data.expediente.id_antecedentes_personales_patologicos);
          this.medicalRecordForm.get('idAntecedentesPersonalesNoPatologicos')?.setValue(data.expediente.id_antecedentes_personales_no_patologicos);
          this.medicalRecordForm.get('idAntecedentesHeredoFamiliares')?.setValue(data.expediente.id_antecedentes_heredo_familiares);
          this.medicalRecordForm.get('genero')?.setValue(this.patientDetail.genero);
          this.medicalRecordForm.get('tipoSanguineo')?.setValue(data.expediente.tipo_sanguineo);

          // Personales Patologicos 
          this.medicalRecordForm.get('enfermedadesInfantiles')?.setValue(data.expediente.Antecedentes_Personales_Patologico.enfermedades_infantiles);
          this.medicalRecordForm.get('secuelas')?.setValue(data.expediente.Antecedentes_Personales_Patologico.secuelas);
          this.medicalRecordForm.get('hospitalizacion')?.setValue(data.expediente.Antecedentes_Personales_Patologico.hospitalizaciones.descripcion_hospitalizacion);
          this.medicalRecordForm.get('quirurgicos')?.setValue(data.expediente.Antecedentes_Personales_Patologico.antecedentes_quirurgicos.descripcion_antecedente_quirurgico);
          this.medicalRecordForm.get('otrasEnfermedades')?.setValue(data.expediente.Antecedentes_Personales_Patologico.otras_enfermedades.descripcion_otras_enfermedades);
          this.medicalRecordForm.get('idHospitalizacion')?.setValue(data.expediente.Antecedentes_Personales_Patologico.id_hospitalizacion);
          this.medicalRecordForm.get('idOtrasEnfermedades')?.setValue(data.expediente.Antecedentes_Personales_Patologico.id_otras_enfermedades);
          this.medicalRecordForm.get('idQuirurgicos')?.setValue(data.expediente.Antecedentes_Personales_Patologico.id_antecedentes_quirurgicos);
          // Personales no Patologicos
          this.medicalRecordForm.get('fumador')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.fumador);
          this.medicalRecordForm.get('alcohol')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.alcohol);
          this.medicalRecordForm.get('drogas')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.drogas);
          this.medicalRecordForm.get('diabetes')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.diabetes);
          this.medicalRecordForm.get('otros')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.otros);
          this.medicalRecordForm.get('inmunizacion')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.Inmunizaciones[0].descripcion_inmunizacion);
          this.medicalRecordForm.get('idInmunizacion')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.Inmunizaciones[0].id_inmunizacion);
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
      this.isPatientMale = this.patientDetail.genero === 'Masculino' ? true : false ;
      console.log(this.patientDetail)
      let idExpediente = this.appoinmentService.currentAppointment.Paciente.id_expediente;
      this.patientService.getMedicalRecordById(idExpediente).subscribe( (data: Expediente) => {
          console.log(data);
          // General
          this.medicalRecordForm.get('idExpediente')?.setValue(data.expediente.id_expediente);
          this.medicalRecordForm.get('idPaciente')?.setValue(data.expediente.id_paciente);
          this.medicalRecordForm.get('fechaCreacionExpediente')?.setValue(data.expediente.fecha_creacion_expediente.split('T')[0]);
          this.medicalRecordForm.get('edadPaciente')?.setValue( this.calculate_age(new Date(this.patientDetail.fecha_nacimiento)));
          this.medicalRecordForm.get('alergias')?.setValue(data.expediente.alergias);
          this.medicalRecordForm.get('idAntecedentesAndrologicos')?.setValue(data.expediente.id_antecedentes_andrologicos);
          this.medicalRecordForm.get('idAntecedentesGinecoObstetrico')?.setValue(data.expediente.id_antecedentes_gineco_obstetrico);
          this.medicalRecordForm.get('idAntecedentesPersonalesPatologicos')?.setValue(data.expediente.id_antecedentes_personales_patologicos);
          this.medicalRecordForm.get('idAntecedentesPersonalesNoPatologicos')?.setValue(data.expediente.id_antecedentes_personales_no_patologicos);
          this.medicalRecordForm.get('idAntecedentesHeredoFamiliares')?.setValue(data.expediente.id_antecedentes_heredo_familiares);
          this.medicalRecordForm.get('genero')?.setValue(this.patientDetail.genero);
          this.medicalRecordForm.get('tipoSanguineo')?.setValue(data.expediente.tipo_sanguineo);
          // Personales Patologicos 
          this.medicalRecordForm.get('enfermedadesInfantiles')?.setValue(data.expediente.Antecedentes_Personales_Patologico.enfermedades_infantiles);
          this.medicalRecordForm.get('secuelas')?.setValue(data.expediente.Antecedentes_Personales_Patologico.secuelas);
          this.medicalRecordForm.get('hospitalizacion')?.setValue(data.expediente.Antecedentes_Personales_Patologico.hospitalizaciones.descripcion_hospitalizacion);
          this.medicalRecordForm.get('quirurgicos')?.setValue(data.expediente.Antecedentes_Personales_Patologico.antecedentes_quirurgicos.descripcion_antecedente_quirurgico);
          this.medicalRecordForm.get('otrasEnfermedades')?.setValue(data.expediente.Antecedentes_Personales_Patologico.otras_enfermedades.descripcion_otras_enfermedades);
          this.medicalRecordForm.get('idHospitalizacion')?.setValue(data.expediente.Antecedentes_Personales_Patologico.id_hospitalizacion);
          this.medicalRecordForm.get('idOtrasEnfermedades')?.setValue(data.expediente.Antecedentes_Personales_Patologico.id_otras_enfermedades);
          this.medicalRecordForm.get('idQuirurgicos')?.setValue(data.expediente.Antecedentes_Personales_Patologico.id_antecedentes_quirurgicos);
          // Personales no Patologicos
          this.medicalRecordForm.get('fumador')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.fumador);
          this.medicalRecordForm.get('alcohol')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.alcohol);
          this.medicalRecordForm.get('drogas')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.drogas);
          this.medicalRecordForm.get('diabetes')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.diabetes);
          this.medicalRecordForm.get('otros')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.otros);
          this.medicalRecordForm.get('inmunizacion')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.Inmunizaciones[0].descripcion_inmunizacion);
          this.medicalRecordForm.get('idInmunizacion')?.setValue(data.expediente.Antecedentes_Personales_No_Patologico.Inmunizaciones[0].id_inmunizacion);
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

  saveMedicalRecord(){
    console.log(this.medicalRecordForm.value)
    // this.dialog.closeAll();}
    let idExpediente = this.medicalRecordForm.get('idExpediente')?.value;

    this.patientService.updateMedicalRecord(this.medicalRecordForm.value, idExpediente).subscribe({
      complete: () => {
        this.dialog.closeAll();
        
      },
      error: (data) => {
        console.log(data);
        Swal.fire({icon: 'error',title:'Error al actualizar el expediente medico', text: data.msg});
      },
      next: (value: any) => {
        Swal.fire({icon: 'success', title: 'Actualización Exitosa', text: value.msg});
      },
    })
  }

  calculate_age(dob: Date) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday and days before from being selected.
    return day !== 0 && day !== 6 && d! > new Date();
  };
}
