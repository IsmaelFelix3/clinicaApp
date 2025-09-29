export interface Medicos {
    msg:     string;
    medicos: Medico[];
}

export interface MedicoById {
    msg:     string;
    medico: Medico;
}

export interface MedicoByEmail {
    msg:     string;
    medico: Medico;
}

export interface Medico {
    id_medico:           number;
    nombre:              string;
    apellidos:           string;
    correo:              string;
    especialidad:        string;
    cedula:              string;
    permiso_secre_salud: string;
    id_edificio:         number;
    id_piso:             number;
    google:              boolean;
    rol:                 string;
    telefono:            string;
    password:            string;
    id_consultorio:         string;
    fecha_registro:      Date;
    createdAt:           Date;
    updatedAt:           Date;
    Consultorio:         Consultorio | null;
    Edificio:            Edificio | null;
    Piso:                Piso | null;
}


export interface Consultorio {
    id_consultorio:          number;
    descripcion_consultorio: string;
}

export interface Edificio {
    id_edificio: number;
    nombre:      string;
}

export interface Piso {
    id_piso:          number;
    descripcion_piso: string;
}

export interface MedicoTable {
    idMedico:           number;
    nombre:              string;
    apellidos:           string;
    correo:              string;
    especialidad:        string;
    cedula:              string;
    permisoSecreSalud: string;
    idEdificio:         number;
    idPiso:             number;
    telefono:           string;
}

export interface MedicoUpdate {
    id_medico:           number;
    nombre:              string;
    apellidos:           string;
    correo:              string;
    especialidad:        string;
    cedula:              string;
    permiso_secre_salud: string;
    id_edificio:         number;
    id_piso:             number;
    telefono:            string;
    id_consultorio:         string;
}

export interface MedicoShort {
    id_medico:           string;
    nombre:              string;
}
