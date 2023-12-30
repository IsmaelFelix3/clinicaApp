
export interface Appointments {
  id_cita: number;
  id_medico: number;
  id_paciente: number;
  estatus: string;
  fecha_cita: string;
  motivo_consulta: string;
  sintoma_principal: string;
  resultados_estudios_realizados: string;
  pulso: string;
  presion_arterial: string;
  temperatura: string;
  frecuencia_cardiaca: string;
  frecuencia_respiratoria: string;
  peso_paciente: string;
  inspeccion_general: string;
  diagnostico: string;
  tratamiento: string;
  createdAt: string;
  updatedAt: string;
  Paciente: {
      id_paciente: number;
      nombre: string;
      apellidos: string;
      fecha_nacimiento: string;
      genero: string;
      lugar_nacimiento: string;
      calle_y_numero: string;
      colonia: string;
      municipio: string;
      estado: string;
      estado_civil: string;
      escolaridad: string;
      profesion: string;
      nacionalidad: string;
      codigo_postal: string;
      correo: string;
      telefono: string;
      google: boolean;
      id_expediente: number;
      rol: string;
      fecha_registro: string;
      createdAt: string;
      updatedAt: string;
  }
}

export interface AppoinmentsCount{
  msg: string;
  citas: number;
}

export interface appointmentHistory {
  idCita: number;
  idPaciente: number;
  peso: string | null;
  sintomas: string | null;
  diagnostico: string | null;
  tratamiento: string | null;
  motivoConsulta: string | null;
  fechaCita: string;
  estatus: string;
  icon: string;
}

export interface History {
  history: HistoryClass;
}

export interface HistoryClass {
  count:        number;
  rows: Appointment[];
}

export interface Appointment {
  id_cita:                        number;
  id_medico:                      number;
  id_paciente:                    number;
  estatus:                        string;
  fecha_cita:                     Date;
  motivo_consulta:                string;
  sintoma_principal:              undefined | string;
  resultados_estudios_realizados: undefined | string;
  pulso:                          undefined | string;
  presion_arterial:               undefined | string;
  temperatura:                    undefined | string;
  frecuencia_cardiaca:            undefined | string;
  frecuencia_respiratoria:        undefined | string;
  peso_paciente:                  undefined | string;
  inspeccion_general:             undefined | string;
  diagnostico:                    undefined | string;
  tratamiento:                    undefined | string;
  createdAt:                      Date;
  updatedAt:                      Date;
}



