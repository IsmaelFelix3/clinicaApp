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
    createdAt:   string;
}

export interface InsumoPost {
    codigo:      string;
    descripcion: string;
    estado:      boolean;
    fechaAlta:   string;
}
