export interface FormaPagoRequest {
    msg:        string;
    formasPago: FormasPago;
}

export interface FormasPago {
    count: number;
    rows:  FormaPago[];
}

export interface FormaPago {
    id_forma_pago:     number;
    nombre_forma_pago: string;
}
