export interface Piso {
    msg:   string;
    pisos: Pisos;
}

export interface Pisos {
    count: number;
    rows:  PisoElement[];
}

export interface PisoElement {
    id_piso:          number;
    id_edificio:      number;
    descripcion_piso: string;
    createdAt:        null;
    updatedAt:        null;
}




