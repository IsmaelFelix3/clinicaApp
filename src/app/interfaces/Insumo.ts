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

export interface getHistorialInsumosProcedimiento {
    historialInsumosProcedimiento: HistorialInsumosProcedimiento[];
}

export interface HistorialInsumosProcedimiento {
    id:                           number;
    procedimiento:                string;
    sku:                          string;
    descripcion:                  string;
    numero_factura_compra:        null;
    numero_lote:                  null;
    fecha_caducidad:              null;
    cantidad_actual:              null;
    laboratorio:                  string;
    dosis:                        string;
    fecha_factura:                null;
    codigo_barras:                null;
    proveedor:                    string;
    nombre_comercial:             null;
    modelo:                       string;
    clasificacion:                string;
    nombre_producto:              null;
    categoria:                    string;
    marca:                        string;
    moneda:                       string;
    unidad_medida:                null;
    precio_venta:                 null;
    costo:                        string;
    codigo_sat:                   null;
    tasa_impuesto:                null;
    nombre_ingrediente_activo:    string;
    denominacion_generica_prod:   string;
    denominacion_distintiva_prod: string;
    datos_fabricante:             string;
    forma_farmaceutica:           string;
    fecha_alta:                   Date;
    createdAt:                    Date;
    updatedAt:                    Date;
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
