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
    id_tipo_procedimiento: number;
    estatus:             string;
    fecha_procedimiento_inicio: Date;
    fecha_procedimiento_fin: Date;
    detalles:           string;
}

export interface GetProcedimientosTableRequest {
    msg:            string;
    procedimientos: ProcedimientosTable;
}

export interface GetProcedimientosTableRequestAdmin {
    msg:            string;
    procedimientos: ProcedimientosTableAdmin;
}

export interface GetProcedimientosCalendar {
    msg:            string;
    procedimientos: ProcedimientoTableAdmin[];
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
    id_tipo_procedimiento:        number;
    estatus:                      string;
    fecha_procedimiento_inicio:   Date;
    fecha_procedimiento_fin:      Date;
    Paciente:                     Paciente;
    Quirofano:                    Quirofano;
    detalles:                     string;
}

export interface ProcedimientoTableAdmin {
    id_reserva:                   number;
    id_medico:                    number;
    id_paciente:                  number;
    id_quirofano:                 number;
    id_tipo_procedimiento:        number;
    estatus:                      string;
    fecha_procedimiento_inicio:   Date;
    fecha_procedimiento_fin:      Date;
    Paciente:                     Paciente;
    Quirofano:                    Quirofano;
    Medico:                       Medico;
    Tipo_Procedimiento:           TipoProcedimiento;
    detalles:                     string;
}

export interface TipoProcedimiento {
    id_tipo_procedimiento: number;
    nombre_procedimiento: string;
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
    color:            string;
}

export interface ProcedimientoPost {
    id_medico:           number;
    id_paciente:         number;
    id_quirofano:        number;
    fecha_procedimiento_inicio: Date;
    fecha_procedimiento_fin: Date;
    id_tipo_procedimiento: number;
    estatus:             string;
    detalles:            string;
}

export interface DeleteProcedure {
    msg: string;
}

export interface GetProcedimiento {
    msg:           string;
    procedimiento: ProcedimientoInformation;
}

export interface ProcedimientoInformation {
    fecha_procedimiento_inicio:                    Date;
    fecha_procedimiento_fin:                       Date;
    estatus:                                       string;
    detalles:                                      string;
    "Paciente.id_paciente":                        number;
    "Paciente.nombre":                             string;
    "Paciente.apellidos":                          string;
    "Quirofano.id_quirofano":                      number;
    "Quirofano.nombre_quirofano":                  string;
    "Medico.id_medico":                            number;
    "Medico.nombre":                               string;
    "Medico.apellidos":                            string;
    "Catalogo_Procedimiento.id_procedimiento":     number;
    "Catalogo_Procedimiento.nombre_procedimiento": string;
}

export interface ProcedimientoEdit{
    idBooking:         number;
    doctorId:          number;
    patientId:         number;
    operatingRoomId:   number;
    procedureId:       number;
    doctorName:        string;
    patientName:       string;
    operatingRoomName: string;
    procedureName:     string;
    startDate:         Date;
    endDate:           Date;
    details:           string;
    status:            string;
}

export interface ProcedimientoPostReturn {
    id_reserva:           number;
    id_paciente:         number;
    id_quirofano:        number;
    fecha_procedimiento_inicio: Date;
    fecha_procedimiento_fin: Date;
    id_tipo_procedimiento: number;
    estatus:             string;
    detalles:            string;
}
