export interface CatalogoProcedimientos {
    msg:                   string;
    catalogoProcedimiento: CatalogoProcedimiento;
}

export interface CatalogoProcedimiento {
    count: number;
    rows:  ProcedimientoCatalogo[];
}

export interface ProcedimientoCatalogo {
    id_procedimiento:         number;
    especialidad:             string;
    nombre_procedimiento:     string;
    "Catalogo_Especialidad.id_especialidad": number;
    "Catalogo_Especialidad.nombre_especialidad": string;
}

export interface ProcedimientoCatalogoTable {
    id_procedimiento:         number;
    especialidad:             string;
    nombre_procedimiento:     string;
}

export interface DetallesProcedimiento {
    id_procedimiento:     number;
    especialidad:         string;
    nombre_procedimiento: string;
    createdAt:            null;
    updatedAt:            null;
}

export interface Quirofano {
    id_quirofano:     number;
    nombre_quirofano: string;
    tiempo_uso:       string;
    color:            string;
    createdAt:        null;
    updatedAt:        null;
}

export interface DetallesProcedure {
    msg:                    string;
    detallesProcedimiento: DetallesProcedimiento;
}

export interface DetallesProcedimientoUpdate {
    id_procedimiento:     number;
    especialidad:         string;
    nombre_procedimiento: string;
}

export interface DetallesProcedimientoPost {
    especialidad:         string;
    nombre_procedimiento: string;
}
