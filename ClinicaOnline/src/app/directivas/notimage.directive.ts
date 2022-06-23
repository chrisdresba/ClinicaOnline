import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[notImage]'
})
export class NotimageDirective {

  constructor(private imagen: ElementRef) { }
  @HostListener('error')
  onError(): void {
    this.imagen.nativeElement.src = "./../../assets/imagenNoEncontrada.png"
  }
  
}