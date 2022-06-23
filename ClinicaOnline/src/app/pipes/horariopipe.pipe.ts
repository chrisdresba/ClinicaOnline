import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horariopipe'
})
export class HorariopipePipe implements PipeTransform {

  transform(valor: any): any {
    
    let value = parseInt(valor);
    if(value == 0){
      return ' ';
    }
    if(value < 12){
      return value + ' ' + 'AM';
    }
    if(value == 12){
      return value + ' ' + 'PM';
    }
   
    if(value > 12){
      return (value-12) + ' ' + 'PM';
    }
  }

}
