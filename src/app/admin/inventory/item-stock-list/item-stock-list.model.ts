import { formatDate } from '@angular/common';
export class ItemStockList {
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
  constructor(itemStockList: ItemStockList) {
    {
      this.id_insumo =  itemStockList.id_insumo;
      this.sku = itemStockList.sku;
      this.descripcion = itemStockList.descripcion;
      this.estado = itemStockList.estado || true;
      this.numeroFacturaCompra = itemStockList.numeroFacturaCompra;
      this.numeroLote = itemStockList.numeroLote;
      this.fechaCaducidad = itemStockList.fechaCaducidad;
      this.cantidadMinima = itemStockList.cantidadMinima;
      this.cantidadMaxima = itemStockList.cantidadMaxima;
      this.cantidadActual = itemStockList.cantidadActual;
      this.laboratorio = itemStockList.laboratorio;
      this.dosis = itemStockList.dosis;
      this.fechaFactura = itemStockList.fechaFactura;
      this.codigoBarras = itemStockList.codigoBarras;
      this.proveedor = itemStockList.proveedor;
      this.nombreComercial = itemStockList.nombreComercial;
      this.modelo = itemStockList.modelo;
      this.clasificacion = itemStockList.clasificacion;
      this.nombreProducto = itemStockList.nombreProducto;
      this.categoria = itemStockList.categoria;
      this.marca = itemStockList.marca;
      this.moneda = itemStockList.moneda;
      this.unidadMedida = itemStockList.unidadMedida;
      this.precioVenta = itemStockList.precioVenta;
      this.costo = itemStockList.costo;
      this.codigoSat = itemStockList.codigoSat;
      this.tasaImpuesto = itemStockList.tasaImpuesto;
      this.informacionFarmaceutica = itemStockList.informacionFarmaceutica;
      this.fechaAlta = itemStockList.fechaAlta;
    }
  }
}
