import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemStockList } from './item-stock-list.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { CargaMasivaReturn, GetInsumos, Insumo, InsumoPost } from 'app/interfaces/Insumo';
@Injectable()
export class ItemStockListService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/itemStockList.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Insumo[]> = new BehaviorSubject<Insumo[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Insumo;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Insumo[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllItemStockLists(){

    // this.subs.sink = this.httpClient
    //   .get<IssuedItems[]>(this.API_URL)
    //   .subscribe({
    //     next: (data) => {
    //       this.isTblLoading = false;
    //       this.dataChange.next(data);
    //     },
    //     error: (error: HttpErrorResponse) => {
    //       this.isTblLoading = false;
    //       console.log(error.name + ' ' + error.message);
    //     },
    //   });
    //   this.dataChange.next(data);
    return this.httpClient.get<GetInsumos>('http://localhost:8000/api/insumos/getInsumos');
  }

  addItem(item: InsumoPost){
    return this.httpClient.post('http://localhost:8000/api/insumos/postInsumo', item);
  }

  addItemsMasive(data: string){
    console.log(data)
    return this.httpClient.post<CargaMasivaReturn>('http://localhost:8000/api/insumos/postItemsMasive', data)
  }

  updateItem(item: Insumo){
    this.dialogData = item;
    return this.httpClient.put('http://localhost:8000/api/insumos/putInsumo', item);
  }

  deleteItemStockList(id: number){
    return this.httpClient.delete(`http://localhost:8000/api/insumos/deleteInsumo/${id}`);
  }
}
