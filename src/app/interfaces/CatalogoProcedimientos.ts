export interface CatalogoProcedimientos {
    msg:                   string;
    catalogoProcedimiento: CatalogoProcedimiento;
}

export interface CatalogoProcedimiento {
    count: number;
    rows:  ProcedimientoCatalogo[];
}

export interface ProcedimientoCatalogo {
    id_procedimiento:     number;
    especialidad:         string;
    nombre_procedimiento: string;
    quirofano:            number;
}
