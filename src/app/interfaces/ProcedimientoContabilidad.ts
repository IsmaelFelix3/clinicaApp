export interface AccountingProcedure {
    msg:            string;
    procedimientos: Procedimientos;
}

export interface Procedimientos {
    count: number;
    rows:  Row[];
}

export interface Row {
    serie:                      string;
    id_reserva:                 number;
    id_medico:                  number;
    id_paciente:                number;
    id_quirofano:               number;
    fecha_procedimiento_inicio: string;
    fecha_procedimiento_fin:    string;
    id_procedimiento:           number;
    estatus:                    string;
    id_banco:                   number;
    id_forma_pago:              number;
    costo:                      string;
    Paciente:                   Paciente;
    Quirofano:                  Quirofano;
    Medico:                     Medico;
    Catalogo_Procedimiento:     CatalogoProcedimiento;
    Catalogo_Banco:             CatalogoBanco;
    Catalogo_Forma_Pago:        CatalogoFormaPago;
}

export interface CatalogoBanco {
    id_banco:     number;
    nombre_banco: string;
}

export interface CatalogoFormaPago {
    id_forma_pago:     number;
    nombre_forma_pago: string;
}

export interface CatalogoProcedimiento {
    id_procedimiento:     number;
    nombre_procedimiento: string;
}

export interface Medico {
    id_medico: number;
    nombre:    string;
    apellidos: string;
}

export interface Paciente {
    nombre:      string;
    apellidos:   string;
    id_paciente: number;
}

export interface Quirofano {
    id_quirofano:     number;
    nombre_quirofano: string;
}

export interface ClosedProcedureInformation {
  id_banco:         number;
  costo:         number;
  id_forma_pago:     number;
  id_reserva:    number;
  id_quirofano:     number;
  estatus:          string;
}
