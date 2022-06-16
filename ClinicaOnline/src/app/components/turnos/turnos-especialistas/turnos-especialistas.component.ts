import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/class/turnos';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-turnos-especialistas',
  templateUrl: './turnos-especialistas.component.html',
  styleUrls: ['./turnos-especialistas.component.scss']
})
export class TurnosEspecialistasComponent implements OnInit {

  public listadoTurnos: Turnos[] = [];
  turnoSeleccionado?: Turnos;
  turno: Turnos;

  constructor(public serv: TurnosService) { 
    this.turno = new Turnos();
  }

  ngOnInit(): void {
  }

  tomarTurnoParaDetalles(Nuevo: Turnos) {
    this.turno = Nuevo;
  }

  cancelarTurno() {
    this.turno.estado = 'cancelar';
    this.serv.actualizarEstado(this.turno!);
  }

}
  