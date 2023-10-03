import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CustomDateTablePipe'
})
export class CustomDateTablePipe implements PipeTransform {

  monthArray = ['Ene','Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  transform(value: string ): string {
    let date = new Date(value).toISOString();
        let hour = date.split('T')[1].substring(0,5);
        let fecha = date.split('T')[0]; 
        let day = fecha.split('-')[2];
        let month = parseInt(fecha.split('-')[1]);
        let strMont = this.monthArray[month-1];
        // let year = fecha.split('-')[0];
        return `${hour} ${strMont}/${day}`;
  }

}
