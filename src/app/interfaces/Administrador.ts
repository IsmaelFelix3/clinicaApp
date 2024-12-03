export interface Administrador {
    id_admin:       number;
    nombre:         string;
    apellidos:      string;
    rol:            string;
    password:       string;
    estatus:        number;
    correo:         string;
    fecha_registro: Date;
    createdAt:      Date;
    updatedAt:      Date;
}
