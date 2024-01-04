export interface ProcedimientosRequest {
    msg:            string;
    procedimientos: Procedimiento[];
}

export interface GetProcedimientosRequest {
    msg:            string;
    procedimientos: Procedimientos;
}

export interface Procedimientos {
    count: number;
    rows:  Procedimiento[];
}

export interface Procedimiento {
    id_reserva:          number;
    id_medico:           number;
    id_paciente:         number;
    id_quirofano:        number;
    fecha_procedimiento: Date;
}

export interface GetProcedimientosTableRequest {
    msg:            string;
    procedimientos: ProcedimientosTable;
}

export interface ProcedimientosTable {
    count: number;
    rows:  ProcedimientoTable[];
}

export interface ProcedimientoTable {
    id_reserva:                   number;
    id_medico:                    number;
    id_paciente:                  number;
    id_quirofano:                 number;
    fecha_procedimiento:          Date;
    Paciente:                     Paciente;
    Quirofano:                    Quirofano;
}

export interface Paciente {
    nombre:    string;
    apellidos: string;
}

export interface Quirofano {
    nombre_quirofano: string;
}

export interface ProcedimientoPost {
    id_medico:           number;
    id_paciente:         number;
    id_quirofano:        number;
    fecha_procedimiento: Date;
}
