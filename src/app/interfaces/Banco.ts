export interface BancoRequest {
    msg:    string;
    bancos: Bancos;
}

export interface Bancos {
    count: number;
    rows:  Banco[];
}

export interface Banco {
    id_banco:     number;
    nombre_banco: string;
}
