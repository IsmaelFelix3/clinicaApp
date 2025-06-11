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
    quirofano:                number;
    // "Quirofano.id_quirofano":     number;
    "Quirofano.nombre_quirofano": string;
    // "Quirofano.tiempo_uso":       string;
    // "Quirofano.color":            string;
    // "Quirofano.createdAt":        null;
    // "Quirofano.updatedAt":        null;
    precioBase:               number;
}

export interface ProcedimientoCatalogoTable {
    id_procedimiento:         number;
    especialidad:             string;
    nombre_procedimiento:     string;
    quirofano:                number;
    nombre_quirofano:         string;
    precioBase:               number;
}

export interface DetallesProcedimiento {
    id_procedimiento:     number;
    especialidad:         string;
    nombre_procedimiento: string;
    quirofano:            number;
    precioBase:           string;
    createdAt:            null;
    updatedAt:            null;
    Quirofano:            Quirofano;
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
    quirofano:            number;
    precioBase:           string;
}

export interface DetallesProcedimientoPost {
    especialidad:         string;
    nombre_procedimiento: string;
    quirofano:            number;
    precioBase:           string;
}
