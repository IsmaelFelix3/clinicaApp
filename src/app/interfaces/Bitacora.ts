export interface BuildingLogRecordsRequest {
    msg:       string;
    registros: Registros;
}

export interface Registros {
    count: number;
    rows:  Registro[];
}

export interface Registro {
    id:                 number;
    tipo_ingreso:       string;
    nombre_ingreso:     string;
    nombre_acompanante: string;
    motivo_ingreso:     string;
    medico:             number;
    fecha:              Date;
    hora_entrada:       string;
    hora_salida:        string;
    updatedAt:          Date;
    createdAt:          Date;
}

export interface RegistroPost {
    tipo_ingreso:       string;
    nombre_ingreso:     string;
    nombre_acompanante: string;
    motivo_ingreso:     string;
    medico:             number;
    fecha:              Date;
    hora_entrada:       string;
    hora_salida:        string;

}

export interface RegistroEdit {
    tipo_ingreso:       string;
    nombre_ingreso:     string;
    nombre_acompanante: string;
    motivo_ingreso:     string;
    medico:             number;
    hora_entrada:       string;
    hora_salida:        string;
}

export interface RegistroEdit {
    msg:       string;
    registro: Registro;

}


