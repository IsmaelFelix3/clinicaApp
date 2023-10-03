
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


