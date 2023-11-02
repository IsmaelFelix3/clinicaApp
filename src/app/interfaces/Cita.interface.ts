

export interface NuevaCita{
    id_paciente: number;
    id_medico: number;
    fecha_cita: string;
    motivo_consulta: string;
}

export interface AppoinmentByIdResponse {
    msg:  string;
    cita: Cita;
}

export interface Cita {
    id_cita:                        number;
    id_medico:                      number;
    id_paciente:                    number;
    estatus:                        string;
    fecha_cita:                     string;
    motivo_consulta:                string;
    sintoma_principal:              null;
    resultados_estudios_realizados: null;
    pulso:                          null;
    presion_arterial:               null;
    temperatura:                    null;
    frecuencia_cardiaca:            null;
    frecuencia_respiratoria:        null;
    peso_paciente:                  null;
    inspeccion_general:             null;
    diagnostico:                    null;
    tratamiento:                    null;
    createdAt:                      Date;
    updatedAt:                      Date;
}