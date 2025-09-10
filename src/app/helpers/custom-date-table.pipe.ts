import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CustomDateTablePipe'
})
export class CustomDateTablePipe implements PipeTransform {

  monthArray = ['Ene','Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  transform(value: string ): string {
    let date = new Date(value).toISOString();
        // let hour = date.split('T')[1].substring(0,5);
        let fecha = date.split('T')[0];
        let year = fecha.substring(0,4)
        let month = parseInt(fecha.substring(5,7))
        let day = fecha.substring(8,10)
        let strMont = this.monthArray[month-1];
        // let year = fecha.split('-')[0];
        return `${day}/${strMont}/${year}`;
  }

}
