import { Component, OnInit , Output,EventEmitter } from '@angular/core';
import { Historia } from 'src/app/class/historia';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-historias',
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.scss']
})
export class HistoriasComponent implements OnInit {

  public listadoHistoria : Historia[] = [];
  @Output() onSeleccionEspecialidad : EventEmitter<Historia> = new EventEmitter<Historia>();

  ngOnInit(): void {
  }


}