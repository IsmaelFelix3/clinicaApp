export interface TipoProcedimiento {
    msg:               string;
    tipoProcedimiento: TipoProcedimientoElement[];
}

export interface TipoProcedimientoElement {
    id_tipo_procedimiento: number;
    nombre_procedimiento:  string;
    insumos_predefinidos:  number;
    tiempo_procedimiento:  string;
}
