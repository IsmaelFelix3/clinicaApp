import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormaPago, FormaPagoById, FormaPagoRequest } from 'app/interfaces/FormaPago';
import { environment } from 'environments/environment';

const urlApi: string = environment.api;
const urlEndpoint: string = environment.paymentMethods;

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(public http: HttpClient) { }

  getPaymentMethods(){
    return this.http.get<FormaPagoRequest>(`${urlApi}${urlEndpoint}getPaymentMethods`);
  }
  getPaymentMethodById(id: number){
    return this.http.get<FormaPagoById>(`${urlApi}${urlEndpoint}getPaymentMethodById/${id}`);
  }
  addPaymentMethod(body: FormaPago){
    return this.http.post(`${urlApi}${urlEndpoint}addPaymentMethod`, body);
  }
  editPaymentMethod(body: FormaPago){
    return this.http.post(`${urlApi}${urlEndpoint}editPaymentMethod`,body);
  }
  deletePaymentMethod(id: number){
    return this.http.delete(`${urlApi}${urlEndpoint}deletePaymentMethod/${id}`);
  }

}
