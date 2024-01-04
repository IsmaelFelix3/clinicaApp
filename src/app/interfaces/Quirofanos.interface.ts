export interface QuirofanosRequest {
    msg:        string;
    quirofanos: Quirofanos;
}

export interface Quirofanos {
    count: number;
    rows:  Quirofano[];
}

export interface Quirofano {
    id_quirofano:     number;
    nombre_quirofano: string;
    tiempo_uso:       string;
}

export interface SchedulesOperatingRoomsRequest {
    msg:                string;
    horariosQuirofanos: HorariosQuirofano[];
}

export interface HorariosQuirofano {
    quirofano: string;
    hora:      string;
    minutos:   string;
}

