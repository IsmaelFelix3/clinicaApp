export interface Consultorio {
    msg:          string;
    consultorios: Consultorios;
}

export interface Consultorios {
    count: number;
    rows:  ConsultorioElement[];
}

export interface ConsultorioElement {
    id_consultorio:          number;
    descripcion_consultorio: string;
    id_edificio:             number;
    createdAt:               null;
    updatedAt:               null;
}
