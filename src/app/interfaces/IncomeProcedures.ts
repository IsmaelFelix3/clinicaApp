export interface IncomeProcedures {
    msg:         string;
    totalIncome: TotalIncome;
}

export interface TotalIncome {
    count: Count[];
    rows:  Row[];
}

export interface Count {
    id_quirofano: number;
    count:        number;
}

export interface Row {
    id_quirofano: number;
    total_income: string;
    Quirofano:    Quirofano;
}

export interface Quirofano {
    id_quirofano:     number;
    nombre_quirofano: string;
}
