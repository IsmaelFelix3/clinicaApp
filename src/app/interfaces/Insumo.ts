export interface GetInsumos {
    msg:     string;
    insumos: Insumos;
}

export interface Insumos {
    count: number;
    rows:  Insumo[];
}

export interface Insumo {
    id_insumo: number;
    sku: string;
    descripcion: string;
    estado: boolean;
    numeroFacturaCompra: string;
    numeroLote: string;
    fechaCaducidad: Date;
    cantidadMinima: number;
    cantidadMaxima: number;
    cantidadActual: number;
    laboratorio: number;
    dosis: string;
    fechaFactura: Date;
    codigoBarras: string;
    proveedor: number;
    nombreComercial: string;
    modelo: string;
    clasificacion: number;
    nombreProducto: string;
    categoria: number;
    marca: number;
    moneda: string;
    unidadMedida: number;
    precioVenta: number;
    costo: number;
    codigoSat: string;
    tasaImpuesto: number;
    informacionFarmaceutica: number;
    fechaAlta: Date;
}

export interface InsumoExcel {
    procedimiento: string;
    sku: string;
    descripcion: string;
    estado: boolean;
    numeroFacturaCompra: string;
    numeroLote: string;
    fechaCaducidad: Date;
    cantidadMinima: number;
    cantidadMaxima: number;
    cantidadActual: number;
    laboratorio: number;
    dosis: string;
    fechaFactura: Date;
    codigoBarras: string;
    proveedor: number;
    nombreComercial: string;
    modelo: string;
    clasificacion: number;
    nombreProducto: string;
    categoria: number;
    marca: number;
    moneda: string;
    unidadMedida: number;
    precioVenta: number;
    costo: number;
    codigoSat: string;
    tasaImpuesto: number;
    informacionFarmaceutica: number;
    fechaAlta: Date;
}

export interface InsumoPost {
    sku: string;
    descripcion: string;
    estado: boolean;
    numeroFacturaCompra: string;
    numeroLote: string;
    fechaCaducidad: Date;
    cantidadMinima: number;
    cantidadMaxima: number;
    cantidadActual: number;
    laboratorio: number;
    dosis: string;
    fechaFactura: Date;
    codigoBarras: string;
    proveedor: number;
    nombreComercial: string;
    modelo: string;
    clasificacion: number;
    nombreProducto: string;
    categoria: number;
    marca: number;
    moneda: string;
    unidadMedida: number;
    precioVenta: number;
    costo: number;
    codigoSat: string;
    tasaImpuesto: number;
    informacionFarmaceutica: number;
    fechaAlta: Date;
}

export interface CargaMasivaReturn {
    msg:           string;
    newProcedures: string[];
    existing:      string[];
}
