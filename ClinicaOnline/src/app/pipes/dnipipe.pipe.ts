import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dnipipe'
})
export class DnipipePipe implements PipeTransform {

  transform(valor: any): any {
    let value = valor.toString();
    let caracteres = value.length + 1; 
    return value.substring(0,caracteres-7)+'.'+value.substring(caracteres-7,caracteres-4)+'.'+ value.substring(caracteres-4,caracteres);
  }

}
