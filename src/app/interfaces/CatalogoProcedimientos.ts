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
}

export interface ProcedimientoCatalogoTable {
    id_procedimiento:         number;
    especialidad:             string;
    nombre_procedimiento:     string;
    quirofano:                number;
    nombre_quirofano: string;
}
