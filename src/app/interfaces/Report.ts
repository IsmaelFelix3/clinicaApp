export interface AcumulativeReport {
    msg:   string;
    final: Final[];
}

export interface Final {
    info:  Info[];
    month: number;
}

export interface Info {
    id_procedimiento:                              number;
    count:                                         number;
    "Catalogo_Procedimiento.nombre_procedimiento": string;
}

export interface IncomeProcedureMonthReport {
    msg:    string;
    result: Array<Result[]>;
}

export interface Result {
    total_income: string;
}


export interface IncomeProcedureOR {
    msg:         string;
    totalIncome: TotalIncome[];
}

export interface TotalIncome {
    id_quirofano: number;
    total_income: string;
    Quirofano:    Quirofano;
}

export interface Quirofano {
    id_quirofano:     number;
    nombre_quirofano: string;
}

export interface CountProceduresOR {
    msg:   string;
    total: Total[];
}

export interface Total {
    id_quirofano: number;
    count:        number;
    Quirofano:    Quirofano;
}
