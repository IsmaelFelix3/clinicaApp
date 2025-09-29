export interface Edificio {
    msg:       string;
    edificios: EdificioElement[];
}

export interface EdificioElement {
    id_edificio: number;
    nombre:      string;
    createdAt:   null;
    updatedAt:   null;
}
