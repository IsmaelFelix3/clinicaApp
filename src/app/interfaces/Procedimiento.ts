export interface ProcedimientosRequest {
    msg:            string;
    procedimientos: Procedimiento[];
}

export interface GetProcedimientosRequest {
    msg:            string;
    procedimientos: Procedimientos;
}

export interface GetProcedimientosRequestCount {
    msg:            string;
    procedimientos: number;
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

export interface GetProcedimientosTableRequestAdmin {
    msg:            string;
    procedimientos: ProcedimientosTableAdmin;
}

export interface ProcedimientosTableAdmin {
    count: number;
    rows:  ProcedimientoTableAdmin[];
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

export interface ProcedimientoTableAdmin {
    id_reserva:                   number;
    id_medico:                    number;
    id_paciente:                  number;
    id_quirofano:                 number;
    fecha_procedimiento:          Date;
    Paciente:                     Paciente;
    Quirofano:                    Quirofano;
    Medico:                       Medico;
}

export interface Medico{
    id_medico:                  number;
    nombre:                     string;
    apellidos:                  string;
}

export interface Paciente {
    id_paciente: number;
    nombre:    string;
    apellidos: string;
}

export interface Quirofano {
    id_quirofano: number;
    nombre_quirofano: string;
}

export interface ProcedimientoPost {
    id_medico:           number;
    id_paciente:         number;
    id_quirofano:        number;
    fecha_procedimiento: Date;
}

export interface DeleteProcedure {
    msg: string;
}
