import { formatDate } from '@angular/common';
export class ItemStockList {
  id_insumo: number;
  codigo: string;
  descripcion: string;
  estado: string;
  date: string;
  constructor(itemStockList: ItemStockList) {
    {
      this.id_insumo = itemStockList.id_insumo;
      this.codigo = itemStockList.codigo || '';
      this.descripcion = itemStockList.descripcion || '';
      this.estado = itemStockList.estado || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
    }
  }
}
