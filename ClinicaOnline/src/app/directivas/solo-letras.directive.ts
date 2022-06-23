import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[soloLetras]'
})
export class SoloLetrasDirective {

  constructor(private readonly elRef: ElementRef) { }
  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const letras = /[^a-zA-Z\s]*/g

    const valorInicial = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = valorInicial.replace(letras, '')
    if (valorInicial !== this.elRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
  
}