import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/class/turnos';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-turnos-pacientes',
  templateUrl: './turnos-pacientes.component.html',
  styleUrls: ['./turnos-pacientes.component.scss']
})
export class TurnosPacientesComponent implements OnInit {

  public listadoTurnos: Turnos[] = [];
  turnoSeleccionado?: Turnos;
  turno: Turnos;
  comentario: string = '';
  estadoTurno: boolean = false;

  constructor(public serv: TurnosService) {
    this.turno = new Turnos();
  }

  ngOnInit(): void {
  }

  tomarTurnoParaDetalles(Nuevo: Turnos) {
    this.turno = Nuevo;
    if (this.turno.estado == 'REALIZADO') {
      this.estadoTurno = true;
    } else {
      this.estadoTurno = false;
    }
  }

  cancelarTurno() {
    this.turno.estado = 'CANCELADO';
    this.turno.resenia = this.comentario;
    this.serv.actualizarEstado(this.turno!);
  }

  turnoact() {
    this.estadoTurno = true;
  }

}