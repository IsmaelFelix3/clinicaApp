export interface EspecialidadRequest {
    msg:         string;
    specialties: Specialties;
}

export interface Specialties {
    count: number;
    rows:  Especialidad[];
}

export interface Especialidad {
    id_especialidad:     number;
    nombre_especialidad: string;
    createdAt:           string;
    updatedAt:           string;
}

export interface EspecialidadPost {
    nombre_especialidad: string;
}

export interface EspecialidadById {
    msg:          string
    specialty:    Especialidad;
}
