export interface Pacientes {
    msg:      string;
    paciente: Paciente[];
}

export interface PacientesByAdmin {
    msg:      string;
    pacientes: Paciente[];
}

export interface Paciente {
    id_paciente:      number;
    nombre:           string;
    apellidos:        string;
    fecha_nacimiento: Date;
    genero:           string;
    lugar_nacimiento: string;
    calle_y_numero:   string;
    colonia:          string;
    municipio:        string;
    estado:           string;
    estado_civil:     string;
    escolaridad:      string;
    profesion:        string;
    nacionalidad:     string;
    codigo_postal:    string;
    correo:           string;
    telefono:         string;
    google:           boolean;
    id_expediente:    number;
    rol:              string;
    fecha_registro:   Date;
    createdAt:        Date;
    updatedAt:        Date;
    password:         string;
    estatus:          number;
    Expediente:       Expediente | null;
}

export interface Expediente {
    id_expediente:                             number;
    id_paciente:                               number;
    fecha_creacion_expediente:                 Date;
    edad_paciente:                             number;
    alergias:                                  string;
    tipo_sanguineo:                            string;
    id_antecedentes_heredo_familiares:         number;
    id_antecedentes_personales_patologicos:    number;
    id_antecedentes_personales_no_patologicos: number;
    id_antecedentes_andrologicos:              number;
    id_antecedentes_gineco_obstetrico:         number;
    createdAt:                                 Date;
    updatedAt:                                 Date;
}


export interface PacienteShort {
    idPaciente: number;
    nombre: string;
    apellidos: string;
    edad: number;
    fecha_nacimiento: Date;
    genero: string;
    lugarNacimiento: string;
    calle: string;
    colonia: string;
    municipio: string;
    estado: string;
    correo: string;
    telefono: string;
    idExpediente: number;
    fechaRegistro: Date;
    bloodType: string;
}

export interface PacienteTableAdmin {
    idPaciente: number;
    nombre: string;
    apellidos: string;
    edad: number;
    correo: string;
    telefono: string;
    fechaRegistro: string;
}

export interface PacienteAltaAdmin {
    nombre: string;
    apellidos: string;
    fecha_nacimiento: Date;
    genero: string;
    correo: string;
    telefono: string;
    google: boolean;
    rol: string;
    password: string;
    estatus: number;
}

