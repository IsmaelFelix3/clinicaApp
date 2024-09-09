export interface GetInsumos {
    msg:     string;
    insumos: Insumos;
}

export interface Insumos {
    count: number;
    rows:  Insumo[];
}

export interface Insumo {
    id_insumo:   number;
    codigo:      string;
    descripcion: string;
    estado:      boolean;
    facturaCompra: string;
    perecedero:  boolean;
    numeroLote:  string;
    fechaCaducidad: string;
    cantidadMinima: number;
    cantidadMaxima: number;
    cantidadActual: number;
    createdAt:   string;
}

export interface InsumoPost {
    codigo:      string;
    descripcion: string;
    estado:      boolean;
    fechaAlta:   string;
    facturaCompra: string;
    perecedero:  boolean;
    numeroLote:  string;
    fechaCaducidad: string;
    cantidadMinima: number;
    cantidadMaxima: number;
    cantidadActual: number;
}
