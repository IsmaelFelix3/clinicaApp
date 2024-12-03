
export interface Usuario {
    msg:       string;
    userLogin: UserLogin;
    token:     string;
}

export interface UserLogin {
    correo:         string;
    estatus:        number;
    rol:            string;
}
