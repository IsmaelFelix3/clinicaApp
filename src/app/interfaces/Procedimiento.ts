export interface ProcedimientosRequest {
    msg:            string;
    procedimientos: Procedimiento[];
}

export interface Procedimiento {
    id_reserva:          number;
    id_medico:           number;
    id_paciente:         number;
    id_quirofano:        number;
    fecha_procedimiento: Date;
}

export interface ProcedimientoPost {
    id_medico:           number;
    id_paciente:         number;
    id_quirofano:        number;
    fecha_procedimiento: Date;
}
