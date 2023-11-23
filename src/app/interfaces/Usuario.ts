
export interface Usuario {
    msg:       string;
    userLogin: UserLogin;
    token:     string;
}

export interface UserLogin {
    id_usuario:     number;
    correo:         string;
    password:       string;
    estatus:        number;
    rol:            string;
    fecha_registro: Date;
    createdAt:      Date;
    updatedAt:      Date;
}
