import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[soloNumeros]'
})
export class SoloNumerosDirective {

  constructor(private readonly elRef: ElementRef) { }
  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const numeros = /[^0-9]*/g

    const valorInicial = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = valorInicial.replace(numeros, '')
    if (valorInicial !== this.elRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
  
}
