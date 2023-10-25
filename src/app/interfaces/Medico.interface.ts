export interface Medicos {
    msg:     string;
    medicos: Medico[];
}

export interface MedicoById {
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
    consultorio:         string;
    fecha_registro:      Date;
    createdAt:           Date;
    updatedAt:           Date;
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
    consultorio:         string;
}
