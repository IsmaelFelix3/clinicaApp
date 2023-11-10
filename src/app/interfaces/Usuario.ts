import { Administrador } from "./Administrador";
import { Medico } from './Medico.interface';
import { Paciente } from 'app/interfaces/Paciente.interface';

export interface UsuarioResponse {
    msg:           string;
    userLogin: Administrador | Medico | Paciente;
}