
export interface AuthRenew {
    msg: string;
    usuarioDB: UsuarioDB;
    token: string;
}

export interface UsuarioDB {
    rol: string;
    estatus: number;
    correo: string;
}