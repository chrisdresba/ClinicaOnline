import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtropipe'
})
export class FiltropipePipe implements PipeTransform {

 
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const post of value) {
     let contador = 0;
      if (post.especialidad.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.especialistaNombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.pacienteNombre.toLowerCase().indexOf(arg.toLowerCase()) > -1)
      {
       contador++;
      };

      if(post.claves[0] != undefined){
        if(post.claves[0] .toLowerCase().indexOf(arg.toLowerCase()) > -1){
          contador++;
        }
      }
      if(post.claves[1] != undefined){
        if(post.claves[1] .toLowerCase().indexOf(arg.toLowerCase()) > -1){
          contador++;
        }
      }
      if(post.claves[2] != undefined){
        if(post.claves[2] .toLowerCase().indexOf(arg.toLowerCase()) > -1){
          contador++;
        }
      }

      if(contador > 0){
        resultPosts.push(post);
      }
    };
    return resultPosts;
  }


}