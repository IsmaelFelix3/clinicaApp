import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormaPagoRequest } from 'app/interfaces/FormaPago';
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
}
